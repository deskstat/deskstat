import { app } from 'electron';
import Pouchdb from 'pouchdb';

Pouchdb.plugin(require('pouchdb-find'));

import type { GetAllQuery } from '../../../../types';

const appDataPath = app.getPath('appData');
let dbPath = `${appDataPath}/data/`;

if (import.meta.env.DEV) {
  dbPath = './data/';
}

const database = new Pouchdb(dbPath);

database.info().then((res) => {
  console.log(res);
});

const INDEXES = {
  Index1: 'INDEX_1',
};

database.getIndexes().then((res) => {
  console.log(res);
  /* for (let x = 0; x < res.indexes.length; x++) {
    if (res.indexes[x].ddoc) {
      database.deleteIndex({
        ddoc: res.indexes[x].ddoc,
      });
    }
  } */
});

database
  .createIndex({
    index: {
      name: INDEXES.Index1,
      ddoc: INDEXES.Index1,
      fields: ['_id', 'title', 'body'],
    },
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

export const save = async <T>(data: T, idPrefix?: string, id?: string) => {
  console.log({ data, idPrefix, id });
  const now = new Date().toJSON();
  const result = await database.put({
    _id: `${idPrefix ? idPrefix + '#' : ''}${id || now}`,
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  const doc: T = await database.get(result.id);
  return doc;
};

export const update = async <T>(id: string, data: T) => {
  if (!id) {
    throw new Error('Id cannot be empty');
  }

  let doc: T = await database.get(id);

  if (!doc) {
    throw new Error(`Data not found with this id: ${id}`);
  }

  const now = new Date().toJSON();
  await database.put({ _id: id, ...data, updatedAt: now });
  doc = await database.get(id);
  return doc;
};

export const getById = async <T>(id: string) => {
  if (!id) {
    throw new Error('Id cannot be empty');
  }

  const doc: T = await database.get(id);

  if (!doc) {
    throw new Error(`Data not found with this id: ${id}`);
  }

  return doc;
};

export const getAll = async ({
  limit = 0,
  startKey = '',
  endKey = '',
}: GetAllQuery) => {
  const options = {
    ...(limit && { limit: startKey ? limit + 1 : limit }),
    ...(startKey && { startkey: startKey }),
    ...(endKey && { endkey: endKey }),
    include_docs: true,
  };
  const result = await database.allDocs(options);
  const data = result?.rows
    ? limit && limit < result.rows.length
      ? result.rows.slice(0, -1)
      : result.rows
    : [];
  const response = {
    totalCount: result?.rows.length ?? 0,
    data,
    ...(limit &&
      data.length >= limit && {
        nextStartKey: result.rows[result.rows.length - 1].id,
      }),
  };

  return response;
};

export const deleteById = async (id: string) => {
  if (!id) {
    throw new Error('Id cannot be empty');
  }

  const doc = await database.get(id);

  if (!doc) {
    throw new Error(`Data not found with this id: ${id}`);
  }

  await database.remove(doc);

  return null;
};

export const search = async <T>(query: Record<string, unknown>) => {
  const result = await database.find({
    selector: { ...query },
  });

  return result.docs as T[];
};

export const db = {
  save,
  update,
  getById,
  getAll,
  deleteById,
  search,
};
