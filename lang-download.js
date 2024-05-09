// google-spreadsheet 文件：https://docs.google.com/spreadsheets/d/1TeebAmRlzMI7ahENrQfx7RzLYtmyPMXnFA5LsoH9zFg/edit?usp=sharing
// 本機執行工具，取得遠端 google-spreadsheet 文件的CSV，再轉成json格式儲存
// 在TERMINAL輸入指令node lang-download.js即可載入語言包

const fs = require("fs").promises; // 使用 fs.promises 可以使 fs 操作變為 Promise-based
const { parse } = require("csv-parse");
const axios = require("axios");

const LANG_PATHS = {
  zh: "./messages/zh/",
  en: "./messages/en/",
};

const SOURCE_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRzzJn9Lb9s8SUZ4mweZcsXZ6rpfCk355i_fFgxlZrYP9jgtsiiay6K--LwY6zZMGPmvc6zZMQv8Ts-/pub?output=csv";

const TAB_ARRAY = [
  { gid: "0", fileName: "1_global.json" },
  { gid: "59220473", fileName: "main-home.json" },
];

async function fetchCsvFromUrl(url) {
  const res = await axios.get(url);
  return new Promise((resolve, reject) => {
    parse(res.data, { columns: true }, (err, output) =>
      err ? reject(err) : resolve(output)
    );
  });
}

async function getLangs(gidVal, languages) {
  if (!gidVal) {
    throw new Error("param of gidVal on getLangs is missing !");
  }

  try {
    const langList = await fetchCsvFromUrl(`${SOURCE_CSV_URL}&gid=${gidVal}`);
    const translations = {};

    languages.forEach((lang) => {
      translations[lang] = {};
    });

    langList.forEach((item) => {
      if (!item.key) return;

      languages.forEach((lang) => {
        translations[lang][item.key.trim()] = item[lang]?.trim() || "";
      });
    });

    return translations;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

async function writeJsonFile(path, data) {
  try {
    await fs.access(path);
    console.log(`${path} 存在`);
  } catch (err) {
    console.log(`${path} 不存在，已幫您新增此路徑檔案`);
  }

  const jsonData = JSON.stringify(data, null, 2);
  try {
    await fs.writeFile(path, jsonData);
    console.log(`${path} 文件寫入成功 `);
  } catch (err) {
    console.error(`${path} 文件寫入失敗 `);
    console.error(err.message);
  }
}

async function generateI18nFile(TAB_ARRAY) {
  try {
    let code = `
    import { getRequestConfig } from "next-intl/server";
    import { notFound } from "next/navigation";
    import { locales } from "./config";

    export default getRequestConfig(async ({ locale }) => {
      if (!locales.includes(locale as any)) notFound()

      const messages = {`;

    for (const item of TAB_ARRAY) {
      code += `...(await import(\`@/messages/\${locale}/${item.fileName}\`)).default,`;
    }

    code += `
        }

        return {
          messages,
        }
      })
    `;

    await fs.writeFile("./src/lib/i18n.ts", code);
    console.log("./src/lib/i18n.ts" + "文件寫入成功");
  } catch (err) {
    console.error("./src/lib/i18n.ts" + "文件寫入失敗");
    console.error(err.message);
  }
}

async function main() {
  const languages = Object.keys(LANG_PATHS);
  await generateI18nFile(TAB_ARRAY);
  for (const item of TAB_ARRAY) {
    try {
      const translations = await getLangs(item.gid, languages);

      if (languages.some((lang) => !Object.keys(translations[lang]).length)) {
        console.warn(
          ` ${item.gid}, ${item.fileName} 語系可能全都是空白的語言包, 已中止運行`
        );
        console.log("---");
        return;
      }

      languages.forEach((lang) => {
        writeJsonFile(
          `${LANG_PATHS[lang]}${item.fileName}`,
          translations[lang]
        );
      });

      console.log("---");
    } catch (err) {
      console.error(err.message);
    }
  }
}

main();
