var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import axios from 'axios';
import { normalizeError } from '../../src/shared/utils/errorHandler';
var quotesApiUrl = 'https://api.api-ninjas.com/v1/quotes';
var handler = function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    var apiKey, url, response, error_1, errorMessage, statusCode;
    var _a, _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                console.log('[fetchQuote] Function called!');
                console.log('[fetchQuote] Event:', JSON.stringify(event, null, 2));
                apiKey = process.env.VITE_QUOTES_API_KEY;
                if (!apiKey) {
                    return [2 /*return*/, {
                            statusCode: 500,
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Headers': 'Content-Type',
                                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                            },
                            body: JSON.stringify({ error: 'API key is not set' }),
                        }];
                }
                // handle CORS preflight queries
                if (event.httpMethod === 'OPTIONS') {
                    return [2 /*return*/, {
                            statusCode: 200,
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Headers': 'Content-Type',
                                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                            },
                            body: '',
                        }];
                }
                _g.label = 1;
            case 1:
                _g.trys.push([1, 3, , 4]);
                url = new URL(quotesApiUrl);
                // if (category) {
                //   url.searchParams.append('category', category);
                // }
                // url.searchParams.append('limit', limit);
                //
                console.log('[fetchQuote] Query to API:', url.toString());
                return [4 /*yield*/, axios.get(url.toString(), {
                        headers: {
                            'X-Api-Key': apiKey,
                            'Content-Type': 'application/json',
                        },
                    })];
            case 2:
                response = _g.sent();
                console.log('[fetchQuote] The response is received, the number of quotes is:', response.data.length);
                console.log('[fetchQuote] First quote:', response.data[0]);
                return [2 /*return*/, {
                        statusCode: 200,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': 'Content-Type',
                            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                        },
                        body: JSON.stringify({
                            quotes: response.data,
                            count: response.data.length,
                        }),
                    }];
            case 3:
                error_1 = _g.sent();
                console.error('[fetchQuote] Error:', error_1);
                errorMessage = 'Failed to fetch quotes';
                statusCode = 500;
                if (axios.isAxiosError(error_1)) {
                    statusCode = ((_a = error_1.response) === null || _a === void 0 ? void 0 : _a.status) || 500;
                    errorMessage = ((_c = (_b = error_1.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || error_1.message;
                    console.error('[fetchQuote] Axios error details:', {
                        status: (_d = error_1.response) === null || _d === void 0 ? void 0 : _d.status,
                        statusText: (_e = error_1.response) === null || _e === void 0 ? void 0 : _e.statusText,
                        data: (_f = error_1.response) === null || _f === void 0 ? void 0 : _f.data,
                    });
                }
                return [2 /*return*/, {
                        statusCode: statusCode,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': 'Content-Type',
                            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                        },
                        body: JSON.stringify({
                            error: errorMessage,
                            message: normalizeError(error_1),
                        }),
                    }];
            case 4: return [2 /*return*/];
        }
    });
}); };
export { handler };
