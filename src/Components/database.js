import {compressToUTF16,decompressFromUTF16} from 'lz-string'
let etkData=null;
const name = "VistaDatabase";
const version = 1;
export const openDB = ()=> {
        return new Promise((resolve, reject) => {
            let data = window.indexedDB.open(name,version);
            data.onerror = () => { reject(); };
            data.onsuccess = () =>
            {
                etkData = data.result;
                resolve();
            };
            data.onupgradeneeded = (e) =>
            {
                etkData = e.target.result;
                createStore("parks");
                createStore("food");
                createStore("gas");
            };
        });
    }
export const createStore = (name="") => {
        etkData.createObjectStore(name, { keyPath: "key" });
    }
export const setData = (storeName="",key="",value={})=>  {
        if (etkData  && storeName !== "" && key!=="") {
            return new Promise((resolve) => {
                let transaction = etkData.transaction([storeName], "readwrite");
                transaction.onerror = () => { resolve(false); };
                let store = transaction.objectStore(storeName);
                let request = store.put({ key: key, value: compressToUTF16(JSON.stringify(value)) });
                request.onsuccess = () => { resolve(true); };
                request.onerror = () => { resolve(false); };
            });
        } else {
            return Promise.resolve(false);
        }
    }
export const getData = (storeName = "", keyVal = "") => {
        if (etkData && storeName !== "" && keyVal!=="") {
            return new Promise((resolve) => {
                let transaction = etkData.transaction([storeName], "readonly");
                let store = transaction.objectStore(storeName);
                transaction.onerror = () => { resolve(false); };
                let request = store.get(keyVal);
                request.onsuccess = () => { resolve(request.result===undefined?false:JSON.parse(decompressFromUTF16(request.result.value)));}
                request.onerror = () => { resolve(false); };
            });
        } else {
            return Promise.resolve(false);
        }
    }
export const getAll = (storeName = "")=>  {
        if (etkData && storeName !== "" ) {
            return new Promise((resolve) => {
                let transaction = etkData.transaction([storeName], "readonly");
                let store = transaction.objectStore(storeName);
                transaction.onerror = () => { resolve(false); };
                let request = store.getAll();
                request.onsuccess = () => {
                    let deCompressed = {};
                    for (let item of request.result) {
                        deCompressed[item.key] = JSON.parse(decompressFromUTF16(item.value));
                    }
                    resolve(deCompressed);
                }
                request.onerror = () => { resolve(false); };
            });
        } else {
            return Promise.resolve(false);
        }
    }
export const getAllKeys = (storeName = "")=>  {
        if (etkData && storeName !== "" ) {
            return new Promise((resolve) => {
                let transaction = etkData.transaction([storeName], "readonly");
                let store = transaction.objectStore(storeName);
                transaction.onerror = () => { resolve(false); };
                let request = store.getAllKeys();
                request.onsuccess = () =>
                {
                    resolve(request.result);
                };
                request.onerror = () => { resolve(false); };
            });
        } else {
            return Promise.resolve(false);
        }
    }
export const deleteData = (storeName = "", keyVal = "") => {
        if (etkData && storeName !== "" && keyVal!=="") {
            return new Promise((resolve) => {
                let transaction = etkData.transaction([storeName], "readwrite");
                let store = transaction.objectStore(storeName);
                transaction.onerror = () => { resolve(false); };
                let request = store.delete(keyVal);
                request.onsuccess = () => { resolve(true); };
                request.onerror = () => { resolve(false); };
            });
        } else {
            return Promise.resolve(false);
        }
    }
export const clearStore = (storeName = "")=>  {
        if (etkData && storeName !== "" ) {
            return new Promise((resolve) => {
                let transaction = etkData.transaction([storeName], "readwrite");
                let store = transaction.objectStore(storeName);
                transaction.onerror = () => { resolve(false); };
                let request = store.clear();
                request.onsuccess = () => { resolve(true); };
                request.onerror = () => { resolve(false); };
            });
        } else {
            return Promise.resolve(false);
        }
    }
