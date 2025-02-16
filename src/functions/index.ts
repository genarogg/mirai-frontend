import {
    $,
    $selectorAll,
    $classList,
    $style,
    $styleText,
    $alternalClass,
    $fadeOut,
    $fadeIn,
    $toggleFade,
    $contains,
    $all,
    $toggle,
    $where,
} from "./domUtils";

import { random, sortNumbers, generateUUID } from "./mathUtils";
import { quitarAcentos, regexUrl, isValidEmail } from "./regexUtils";
import { cleanArray, log } from "./utils";
import { getPredictionStatus, runPrediction } from "./fashn";

export {
    $,
    $selectorAll,
    $classList,
    $style,
    $styleText,
    $alternalClass,
    $fadeOut,
    $fadeIn,
    $toggleFade,
    $contains,
    $all,
    $toggle,
    $where,
    random,
    sortNumbers,
    generateUUID,
    quitarAcentos, regexUrl, isValidEmail,
    cleanArray, log,
    getPredictionStatus, runPrediction
};