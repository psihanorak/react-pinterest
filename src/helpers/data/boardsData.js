import axios from 'axios';

import utils from '../utils';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoardsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const getSingleBoard = (boardId) => axios.get(`${baseUrl}/boards/${boardId}.json`);

const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

const createBoard = (newBoard) => axios.post(`${baseUrl}/boards.json`, newBoard);

const updateBoard = (boardId, editedBoard) => axios.put(`${baseUrl}/boards/${boardId}.json`, editedBoard);

export default {
  getBoardsByUid,
  getSingleBoard,
  deleteBoard,
  createBoard,
  updateBoard,
};
