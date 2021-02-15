import {getRandomIntegerFromRange, isAllowedStringLength} from './util.js';
import {INITIAL_POST_COUNT, createObject} from './data.js';

getRandomIntegerFromRange(0, 10);
isAllowedStringLength('hello', 10);


const commentList = new Array(INITIAL_POST_COUNT).fill().map((_, i) => createObject(i));

commentList;
console.log(commentList);

