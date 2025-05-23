const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUdLZ1I2SWZWSEFmL2pFWGlXK29tVElKVm1jL0FYcG1GVkNMc0ZXdEVsaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0ZxZVNkeUVuVDYvd0dRTndlcUtBejhrRnYwMVhHd1R3Rmt5T21tVnhHWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvQnZnSEFPRWo4RjFFOFVrU2c0N1hzak1qWkFsR216MCtkRThDR3pGYlVjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3aytNWkhvUnRXK2dQWDRHOXprcWhXTDNtZ293MERhRENuQ05CNGdJR2xVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVEaXZnYklXQi9DUHBhUGcwcHNvV2R4NDlTYmd1ZVgxeFRBU3hNanZGWDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNzYlNWWjh3UnBHb0N1NWxBZThocmJKK1FRYlEwZnk2cUhVTmpqUTcyRFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib081Ykl1ZnEvZElmM2psWHlobTl0ZkV6NGxjK2hlUTJlWHhNREhkeHNXND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSGFGQmZHQ1dQdGFKanR3N0IyV2d0SEdMQjY2cW5sK0J4S3dMRmthbnBETT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilg4RllndHI5UVhvV3VKWDRGMmdRZGJqK3FybWZDd01JWm9PWXoyN00yQXJuQldsbXFLWGJ3NHhIMFBoOTN6SXk0L0xNdnRsR2E2VzhxUktzYlNkMkR3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjcsImFkdlNlY3JldEtleSI6IndHN3dsbjBIRmowNGkzVWF5R1cveVMxaXhkSE1xL0p0UjNTNU5tLzB1cmM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMTMwNDc2OTc2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijk4Q0NDOUJGNTAxRkVFMzQ5MzNDNzE2OTI2QkVBMTcyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDgwMTcwNTB9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkyMzEzMDQ3Njk3NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI2NUQ3RTc3NzczRjBEQTZCRUU0NjZBQTI2RjY2Rjk4MCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ4MDE3MDU2fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiIxMjNMT1RVUyIsIm1lIjp7ImlkIjoiOTIzMTMwNDc2OTc2OjIxQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCThqnhkY5PVEkgVOGXqeGXt0lT4ZW84ZGJwrM8IFxuXG5cblxuXG5cblxuXG7Yrdiz24zZkNmA2YDZkduh2YDZhiDYqNin2K/YtNmQ2YDZgNmR26HZgNin24Eg2KrZkNmA2YDZkduh2YDYp9io2LTZkCDhkYnCsyIsImxpZCI6IjMyMDA2NjgzNTIxMDM5OjIxQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTC9yamRFREVQZSt3c0VHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQXpOM2FHTGcrbDBzcGM3K3cwYWl1aU1XNzU4RXBsdTFqeHBPUHlFcWl6cz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVEpYR1BxZGJ1ODhJd1ZuVlhlN2M0dk9wME5zMmVKSDFxeVJzRkhqNmdMd09Xd2UxazBBUUxEaFJ0akJ3RUpyaWJzVXlQakVjRzh5bDltUXhCMEYrQnc9PSIsImRldmljZVNpZ25hdHVyZSI6IkdOY3VQS0hwLzlraXJiNDhaNDkzT2ZVWnMzQ25XUkpSVmppbXcyeTVZNUFHR3lUSnFqQll4bUVPd2xXcWRMdGs0QzA1RjBEdUNFdUtobnBzM2ZiaEF3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMTMwNDc2OTc2OjIxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFNemQyaGk0UHBkTEtYTy9zTkdvcm9qRnUrZkJLWmJ0WThhVGo4aEtvczcifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBSUlCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0ODAxNzAyOSwibGFzdFByb3BIYXNoIjoiUFdrNUIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUR6QiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Charles ke",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Charles ke",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-VMD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

