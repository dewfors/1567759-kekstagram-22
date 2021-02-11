import {getRandomIntegerFromRange, isAllowedStringLength} from './util.js';
import {getInitialPostCount, createObject} from './data.js';

getRandomIntegerFromRange(0, 10);
isAllowedStringLength('hello', 10);


const commentList = new Array(getInitialPostCount()).fill().map((_, i) => createObject(i));

commentList;
