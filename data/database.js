import Database from "better-sqlite3";

const db = new Database("data/db.sqlite")
db.prepare(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT
)`).run();

export const getAll = () => {
    return db.prepare(`SELECT * FROM posts`).all();
}

export const getById = (id) => {
    return db.prepare(`SELECT * FROM posts WHERE id = ?`).get(id);
}

export const addNew = (title, content) => {
    return db.prepare(`INSERT INTO posts (title, content) VALUES (?,?)`).run(title, content);
}

export const remove = (id) => {
    return db.prepare(`DELETE FROM posts WHERE id = ?`).run(id);
}

const { rowCount } = db.prepare(`SELECT COUNT(id) AS rowCount FROM posts`).get();
console.log(rowCount)
if (rowCount == 0) {
    const data = [
        {
            "title": "A JavaScript alapjai",
            "content": "A JavaScript az egyik legnépszerűbb programozási nyelv webfejlesztéshez."
        },
        {
            "title": "Node.js backend fejlesztés",
            "content": "A Node.js lehetővé teszi szerveroldali alkalmazások fejlesztését JavaScript használatával."
        },
        {
            "title": "REST API tervezés",
            "content": "A jól megtervezett REST API egyszerűbbé teszi az alkalmazások közötti kommunikációt."
        },
        {
            "title": "Adatbázis kezelés SQLite-tal",
            "content": "Az SQLite egy könnyű, beágyazott adatbázis motor kisebb projektekhez."
        }
    ]

    data.forEach(e => addNew(e.title, e.content))
}