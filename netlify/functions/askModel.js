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
import ModelClient, { isUnexpected } from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';
import { normalizeError } from '../../src/shared/utils/errorHandler';
var endpoint = 'https://models.github.ai/inference';
var model = 'openai/gpt-4.1';
var handler = function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    var token, body, conversation, _a, temperature, _b, top_p, _c, customModel, client, response, content, error_1;
    var _d, _e, _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                console.log('[askModel] Function called!');
                token = process.env.VITE_GITHUB_TOKEN;
                if (!token) {
                    return [2 /*return*/, errorResponse(500, 'GitHub token is not set')];
                }
                if (event.httpMethod === 'OPTIONS') {
                    return [2 /*return*/, corsResponse(200, '')];
                }
                if (event.httpMethod !== 'POST') {
                    return [2 /*return*/, errorResponse(405, 'Method not allowed. Use POST.')];
                }
                _h.label = 1;
            case 1:
                _h.trys.push([1, 3, , 4]);
                body = JSON.parse(event.body || '{}');
                conversation = body.conversation, _a = body.temperature, temperature = _a === void 0 ? 1.0 : _a, _b = body.top_p, top_p = _b === void 0 ? 1.0 : _b, _c = body.customModel, customModel = _c === void 0 ? model : _c;
                if (!conversation || !Array.isArray(conversation)) {
                    return [2 /*return*/, errorResponse(400, 'Invalid request body. Expected conversation array.')];
                }
                client = ModelClient(endpoint, new AzureKeyCredential(token));
                return [4 /*yield*/, client.path('/chat/completions').post({
                        body: {
                            messages: conversation,
                            temperature: temperature,
                            top_p: top_p,
                            model: customModel,
                        },
                    })];
            case 2:
                response = _h.sent();
                if (isUnexpected(response)) {
                    console.error('[askModel] Unexpected response:', response.body.error);
                    throw response.body.error;
                }
                if (!response.body.choices || response.body.choices.length === 0) {
                    throw new Error('No choices returned from model');
                }
                content = (_g = (_f = (_e = (_d = response.body.choices) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.message) === null || _f === void 0 ? void 0 : _f.content) !== null && _g !== void 0 ? _g : '';
                return [2 /*return*/, corsResponse(200, {
                        content: content,
                        model: customModel,
                        usage: response.body.usage || null,
                    })];
            case 3:
                error_1 = _h.sent();
                console.error('[askModel] Error:', error_1);
                return [2 /*return*/, errorResponse(500, 'Failed to get response from model', normalizeError(error_1))];
            case 4: return [2 /*return*/];
        }
    });
}); };
function corsResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: corsHeaders(),
        body: typeof body === 'string' ? body : JSON.stringify(body),
    };
}
function errorResponse(statusCode, error, message) {
    return {
        statusCode: statusCode,
        headers: corsHeaders(),
        body: JSON.stringify({ error: error, message: message }),
    };
}
function corsHeaders() {
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    };
}
export { handler };
