(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=e(o);fetch(o.href,s)}})();var F;(function(t){t.STRING="string",t.NUMBER="number",t.INTEGER="integer",t.BOOLEAN="boolean",t.ARRAY="array",t.OBJECT="object"})(F||(F={}));/**
* @license
* Copyright 2024 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var G;(function(t){t.LANGUAGE_UNSPECIFIED="language_unspecified",t.PYTHON="python"})(G||(G={}));var $;(function(t){t.OUTCOME_UNSPECIFIED="outcome_unspecified",t.OUTCOME_OK="outcome_ok",t.OUTCOME_FAILED="outcome_failed",t.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})($||($={}));/**
* @license
* Copyright 2024 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const j=["user","model","function","system"];var B;(function(t){t.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",t.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",t.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",t.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",t.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",t.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(B||(B={}));var K;(function(t){t.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",t.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",t.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",t.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",t.BLOCK_NONE="BLOCK_NONE"})(K||(K={}));var Y;(function(t){t.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",t.NEGLIGIBLE="NEGLIGIBLE",t.LOW="LOW",t.MEDIUM="MEDIUM",t.HIGH="HIGH"})(Y||(Y={}));var q;(function(t){t.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",t.SAFETY="SAFETY",t.OTHER="OTHER"})(q||(q={}));var N;(function(t){t.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",t.STOP="STOP",t.MAX_TOKENS="MAX_TOKENS",t.SAFETY="SAFETY",t.RECITATION="RECITATION",t.LANGUAGE="LANGUAGE",t.BLOCKLIST="BLOCKLIST",t.PROHIBITED_CONTENT="PROHIBITED_CONTENT",t.SPII="SPII",t.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",t.OTHER="OTHER"})(N||(N={}));var V;(function(t){t.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",t.RETRIEVAL_QUERY="RETRIEVAL_QUERY",t.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",t.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",t.CLASSIFICATION="CLASSIFICATION",t.CLUSTERING="CLUSTERING"})(V||(V={}));var J;(function(t){t.MODE_UNSPECIFIED="MODE_UNSPECIFIED",t.AUTO="AUTO",t.ANY="ANY",t.NONE="NONE"})(J||(J={}));var W;(function(t){t.MODE_UNSPECIFIED="MODE_UNSPECIFIED",t.MODE_DYNAMIC="MODE_DYNAMIC"})(W||(W={}));/**
* @license
* Copyright 2024 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class u extends Error{constructor(e){super(`[GoogleGenerativeAI Error]: ${e}`)}}class A extends u{constructor(e,n){super(e),this.response=n}}class it extends u{constructor(e,n,o,s){super(e),this.status=n,this.statusText=o,this.errorDetails=s}}class C extends u{}class at extends u{}/**
* @license
* Copyright 2024 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const ut="https://generativelanguage.googleapis.com",ft="v1beta",ht="0.24.1",mt="genai-js";var y;(function(t){t.GENERATE_CONTENT="generateContent",t.STREAM_GENERATE_CONTENT="streamGenerateContent",t.COUNT_TOKENS="countTokens",t.EMBED_CONTENT="embedContent",t.BATCH_EMBED_CONTENTS="batchEmbedContents"})(y||(y={}));class gt{constructor(e,n,o,s,i){this.model=e,this.task=n,this.apiKey=o,this.stream=s,this.requestOptions=i}toString(){var e,n;const o=((e=this.requestOptions)===null||e===void 0?void 0:e.apiVersion)||ft;let s=`${((n=this.requestOptions)===null||n===void 0?void 0:n.baseUrl)||ut}/${o}/${this.model}:${this.task}`;return this.stream&&(s+="?alt=sse"),s}}function pt(t){const e=[];return t!=null&&t.apiClient&&e.push(t.apiClient),e.push(`${mt}/${ht}`),e.join(" ")}async function Et(t){var e;const n=new Headers;n.append("Content-Type","application/json"),n.append("x-goog-api-client",pt(t.requestOptions)),n.append("x-goog-api-key",t.apiKey);let o=(e=t.requestOptions)===null||e===void 0?void 0:e.customHeaders;if(o){if(!(o instanceof Headers))try{o=new Headers(o)}catch(s){throw new C(`unable to convert customHeaders value ${JSON.stringify(o)} to Headers: ${s.message}`)}for(const[s,i]of o.entries()){if(s==="x-goog-api-key")throw new C(`Cannot set reserved header name ${s}`);if(s==="x-goog-api-client")throw new C(`Header name ${s} can only be set using the apiClient field`);n.append(s,i)}}return n}async function Ct(t,e,n,o,s,i){const a=new gt(t,e,n,o,i);return{url:a.toString(),fetchOptions:Object.assign(Object.assign({},It(i)),{method:"POST",headers:await Et(a),body:s})}}async function M(t,e,n,o,s,i={},a=fetch){const{url:r,fetchOptions:d}=await Ct(t,e,n,o,s,i);return Ot(r,d,a)}async function Ot(t,e,n=fetch){let o;try{o=await n(t,e)}catch(s){yt(s,t)}return o.ok||await vt(o,t),o}function yt(t,e){let n=t;throw n.name==="AbortError"?(n=new at(`Request aborted when fetching ${e.toString()}: ${t.message}`),n.stack=t.stack):t instanceof it||t instanceof C||(n=new u(`Error fetching from ${e.toString()}: ${t.message}`),n.stack=t.stack),n}async function vt(t,e){let n="",o;try{const s=await t.json();n=s.error.message,s.error.details&&(n+=` ${JSON.stringify(s.error.details)}`,o=s.error.details)}catch{}throw new it(`Error fetching from ${e.toString()}: [${t.status} ${t.statusText}] ${n}`,t.status,t.statusText,o)}function It(t){const e={};if((t==null?void 0:t.signal)!==void 0||(t==null?void 0:t.timeout)>=0){const n=new AbortController;(t==null?void 0:t.timeout)>=0&&setTimeout(()=>n.abort(),t.timeout),t!=null&&t.signal&&t.signal.addEventListener("abort",()=>{n.abort()}),e.signal=n.signal}return e}/**
* @license
* Copyright 2024 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function k(t){return t.text=()=>{if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&console.warn(`This response had ${t.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),D(t.candidates[0]))throw new A(`${g(t)}`,t);return At(t)}else if(t.promptFeedback)throw new A(`Text not available. ${g(t)}`,t);return""},t.functionCall=()=>{if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&console.warn(`This response had ${t.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),D(t.candidates[0]))throw new A(`${g(t)}`,t);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),X(t)[0]}else if(t.promptFeedback)throw new A(`Function call not available. ${g(t)}`,t)},t.functionCalls=()=>{if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&console.warn(`This response had ${t.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),D(t.candidates[0]))throw new A(`${g(t)}`,t);return X(t)}else if(t.promptFeedback)throw new A(`Function call not available. ${g(t)}`,t)},t}function At(t){var e,n,o,s;const i=[];if(!((n=(e=t.candidates)===null||e===void 0?void 0:e[0].content)===null||n===void 0)&&n.parts)for(const a of(s=(o=t.candidates)===null||o===void 0?void 0:o[0].content)===null||s===void 0?void 0:s.parts)a.text&&i.push(a.text),a.executableCode&&i.push("\n```"+a.executableCode.language+`
`+a.executableCode.code+"\n```\n"),a.codeExecutionResult&&i.push("\n```\n"+a.codeExecutionResult.output+"\n```\n");return i.length>0?i.join(""):""}function X(t){var e,n,o,s;const i=[];if(!((n=(e=t.candidates)===null||e===void 0?void 0:e[0].content)===null||n===void 0)&&n.parts)for(const a of(s=(o=t.candidates)===null||o===void 0?void 0:o[0].content)===null||s===void 0?void 0:s.parts)a.functionCall&&i.push(a.functionCall);if(i.length>0)return i}const _t=[N.RECITATION,N.SAFETY,N.LANGUAGE];function D(t){return!!t.finishReason&&_t.includes(t.finishReason)}function g(t){var e,n,o;let s="";if((!t.candidates||t.candidates.length===0)&&t.promptFeedback)s+="Response was blocked",!((e=t.promptFeedback)===null||e===void 0)&&e.blockReason&&(s+=` due to ${t.promptFeedback.blockReason}`),!((n=t.promptFeedback)===null||n===void 0)&&n.blockReasonMessage&&(s+=`: ${t.promptFeedback.blockReasonMessage}`);else if(!((o=t.candidates)===null||o===void 0)&&o[0]){const i=t.candidates[0];D(i)&&(s+=`Candidate was blocked due to ${i.finishReason}`,i.finishMessage&&(s+=`: ${i.finishMessage}`))}return s}function b(t){return this instanceof b?(this.v=t,this):new b(t)}function Tt(t,e,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var o=n.apply(t,e||[]),s,i=[];return s={},a("next"),a("throw"),a("return"),s[Symbol.asyncIterator]=function(){return this},s;function a(l){o[l]&&(s[l]=function(c){return new Promise(function(f,I){i.push([l,c,f,I])>1||r(l,c)})})}function r(l,c){try{d(o[l](c))}catch(f){v(i[0][3],f)}}function d(l){l.value instanceof b?Promise.resolve(l.value.v).then(O,S):v(i[0][2],l)}function O(l){r("next",l)}function S(l){r("throw",l)}function v(l,c){l(c),i.shift(),i.length&&r(i[0][0],i[0][1])}}/**
* @license
* Copyright 2024 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const z=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function Rt(t){const e=t.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),n=bt(e),[o,s]=n.tee();return{stream:Nt(o),response:St(s)}}async function St(t){const e=[],n=t.getReader();for(;;){const{done:o,value:s}=await n.read();if(o)return k(wt(e));e.push(s)}}function Nt(t){return Tt(this,arguments,function*(){const e=t.getReader();for(;;){const{value:n,done:o}=yield b(e.read());if(o)break;yield yield b(k(n))}})}function bt(t){const e=t.getReader();return new ReadableStream({start(n){let o="";return s();function s(){return e.read().then(({value:i,done:a})=>{if(a){if(o.trim()){n.error(new u("Failed to parse stream"));return}n.close();return}o+=i;let r=o.match(z),d;for(;r;){try{d=JSON.parse(r[1])}catch{n.error(new u(`Error parsing JSON response: "${r[1]}"`));return}n.enqueue(d),o=o.substring(r[0].length),r=o.match(z)}return s()}).catch(i=>{let a=i;throw a.stack=i.stack,a.name==="AbortError"?a=new at("Request aborted when reading from the stream"):a=new u("Error reading from the stream"),a})}}})}function wt(t){const e=t[t.length-1],n={promptFeedback:e==null?void 0:e.promptFeedback};for(const o of t){if(o.candidates){let s=0;for(const i of o.candidates)if(n.candidates||(n.candidates=[]),n.candidates[s]||(n.candidates[s]={index:s}),n.candidates[s].citationMetadata=i.citationMetadata,n.candidates[s].groundingMetadata=i.groundingMetadata,n.candidates[s].finishReason=i.finishReason,n.candidates[s].finishMessage=i.finishMessage,n.candidates[s].safetyRatings=i.safetyRatings,i.content&&i.content.parts){n.candidates[s].content||(n.candidates[s].content={role:i.content.role||"user",parts:[]});const a={};for(const r of i.content.parts)r.text&&(a.text=r.text),r.functionCall&&(a.functionCall=r.functionCall),r.executableCode&&(a.executableCode=r.executableCode),r.codeExecutionResult&&(a.codeExecutionResult=r.codeExecutionResult),Object.keys(a).length===0&&(a.text=""),n.candidates[s].content.parts.push(a)}s++}o.usageMetadata&&(n.usageMetadata=o.usageMetadata)}return n}/**
* @license
* Copyright 2024 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function rt(t,e,n,o){const s=await M(e,y.STREAM_GENERATE_CONTENT,t,!0,JSON.stringify(n),o);return Rt(s)}async function ct(t,e,n,o){const s=await(await M(e,y.GENERATE_CONTENT,t,!1,JSON.stringify(n),o)).json();return{response:k(s)}}/**
* @license
* Copyright 2024 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function lt(t){if(t!=null){if(typeof t=="string")return{role:"system",parts:[{text:t}]};if(t.text)return{role:"system",parts:[t]};if(t.parts)return t.role?t:{role:"system",parts:t.parts}}}function w(t){let e=[];if(typeof t=="string")e=[{text:t}];else for(const n of t)typeof n=="string"?e.push({text:n}):e.push(n);return Mt(e)}function Mt(t){const e={role:"user",parts:[]},n={role:"function",parts:[]};let o=!1,s=!1;for(const i of t)"functionResponse"in i?(n.parts.push(i),s=!0):(e.parts.push(i),o=!0);if(o&&s)throw new u("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!o&&!s)throw new u("No content is provided for sending chat message.");return o?e:n}function Lt(t,e){var n;let o={model:e==null?void 0:e.model,generationConfig:e==null?void 0:e.generationConfig,safetySettings:e==null?void 0:e.safetySettings,tools:e==null?void 0:e.tools,toolConfig:e==null?void 0:e.toolConfig,systemInstruction:e==null?void 0:e.systemInstruction,cachedContent:(n=e==null?void 0:e.cachedContent)===null||n===void 0?void 0:n.name,contents:[]};const s=t.generateContentRequest!=null;if(t.contents){if(s)throw new C("CountTokensRequest must have one of contents or generateContentRequest, not both.");o.contents=t.contents}else if(s)o=Object.assign(Object.assign({},o),t.generateContentRequest);else{const i=w(t);o.contents=[i]}return{generateContentRequest:o}}function Q(t){let e;return t.contents?e=t:e={contents:[w(t)]},t.systemInstruction&&(e.systemInstruction=lt(t.systemInstruction)),e}function xt(t){return typeof t=="string"||Array.isArray(t)?{content:w(t)}:t}/**
* @license
* Copyright 2024 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const Z=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],Dt={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function Pt(t){let e=!1;for(const n of t){const{role:o,parts:s}=n;if(!e&&o!=="user")throw new u(`First content should be with role 'user', got ${o}`);if(!j.includes(o))throw new u(`Each item should include role field. Got ${o} but valid roles are: ${JSON.stringify(j)}`);if(!Array.isArray(s))throw new u("Content should have 'parts' property with an array of Parts");if(s.length===0)throw new u("Each Content should have at least one part");const i={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const r of s)for(const d of Z)d in r&&(i[d]+=1);const a=Dt[o];for(const r of Z)if(!a.includes(r)&&i[r]>0)throw new u(`Content with role '${o}' can't contain '${r}' part`);e=!0}}function tt(t){var e;if(t.candidates===void 0||t.candidates.length===0)return!1;const n=(e=t.candidates[0])===null||e===void 0?void 0:e.content;if(n===void 0||n.parts===void 0||n.parts.length===0)return!1;for(const o of n.parts)if(o===void 0||Object.keys(o).length===0||o.text!==void 0&&o.text==="")return!1;return!0}/**
* @license
* Copyright 2024 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const et="SILENT_ERROR";class Ht{constructor(e,n,o,s={}){this.model=n,this.params=o,this._requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=e,o!=null&&o.history&&(Pt(o.history),this._history=o.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e,n={}){var o,s,i,a,r,d;await this._sendPromise;const O=w(e),S={safetySettings:(o=this.params)===null||o===void 0?void 0:o.safetySettings,generationConfig:(s=this.params)===null||s===void 0?void 0:s.generationConfig,tools:(i=this.params)===null||i===void 0?void 0:i.tools,toolConfig:(a=this.params)===null||a===void 0?void 0:a.toolConfig,systemInstruction:(r=this.params)===null||r===void 0?void 0:r.systemInstruction,cachedContent:(d=this.params)===null||d===void 0?void 0:d.cachedContent,contents:[...this._history,O]},v=Object.assign(Object.assign({},this._requestOptions),n);let l;return this._sendPromise=this._sendPromise.then(()=>ct(this._apiKey,this.model,S,v)).then(c=>{var f;if(tt(c.response)){this._history.push(O);const I=Object.assign({parts:[],role:"model"},(f=c.response.candidates)===null||f===void 0?void 0:f[0].content);this._history.push(I)}else{const I=g(c.response);I&&console.warn(`sendMessage() was unsuccessful. ${I}. Inspect response object for details.`)}l=c}).catch(c=>{throw this._sendPromise=Promise.resolve(),c}),await this._sendPromise,l}async sendMessageStream(e,n={}){var o,s,i,a,r,d;await this._sendPromise;const O=w(e),S={safetySettings:(o=this.params)===null||o===void 0?void 0:o.safetySettings,generationConfig:(s=this.params)===null||s===void 0?void 0:s.generationConfig,tools:(i=this.params)===null||i===void 0?void 0:i.tools,toolConfig:(a=this.params)===null||a===void 0?void 0:a.toolConfig,systemInstruction:(r=this.params)===null||r===void 0?void 0:r.systemInstruction,cachedContent:(d=this.params)===null||d===void 0?void 0:d.cachedContent,contents:[...this._history,O]},v=Object.assign(Object.assign({},this._requestOptions),n),l=rt(this._apiKey,this.model,S,v);return this._sendPromise=this._sendPromise.then(()=>l).catch(c=>{throw new Error(et)}).then(c=>c.response).then(c=>{if(tt(c)){this._history.push(O);const f=Object.assign({},c.candidates[0].content);f.role||(f.role="model"),this._history.push(f)}else{const f=g(c);f&&console.warn(`sendMessageStream() was unsuccessful. ${f}. Inspect response object for details.`)}}).catch(c=>{c.message!==et&&console.error(c)}),l}}/**
* @license
* Copyright 2024 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function kt(t,e,n,o){return(await M(e,y.COUNT_TOKENS,t,!1,JSON.stringify(n),o)).json()}/**
* @license
* Copyright 2024 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function Ut(t,e,n,o){return(await M(e,y.EMBED_CONTENT,t,!1,JSON.stringify(n),o)).json()}async function Ft(t,e,n,o){const s=n.requests.map(i=>Object.assign(Object.assign({},i),{model:e}));return(await M(e,y.BATCH_EMBED_CONTENTS,t,!1,JSON.stringify({requests:s}),o)).json()}/**
* @license
* Copyright 2024 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class nt{constructor(e,n,o={}){this.apiKey=e,this._requestOptions=o,n.model.includes("/")?this.model=n.model:this.model=`models/${n.model}`,this.generationConfig=n.generationConfig||{},this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=lt(n.systemInstruction),this.cachedContent=n.cachedContent}async generateContent(e,n={}){var o;const s=Q(e),i=Object.assign(Object.assign({},this._requestOptions),n);return ct(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(o=this.cachedContent)===null||o===void 0?void 0:o.name},s),i)}async generateContentStream(e,n={}){var o;const s=Q(e),i=Object.assign(Object.assign({},this._requestOptions),n);return rt(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(o=this.cachedContent)===null||o===void 0?void 0:o.name},s),i)}startChat(e){var n;return new Ht(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(n=this.cachedContent)===null||n===void 0?void 0:n.name},e),this._requestOptions)}async countTokens(e,n={}){const o=Lt(e,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),s=Object.assign(Object.assign({},this._requestOptions),n);return kt(this.apiKey,this.model,o,s)}async embedContent(e,n={}){const o=xt(e),s=Object.assign(Object.assign({},this._requestOptions),n);return Ut(this.apiKey,this.model,o,s)}async batchEmbedContents(e,n={}){const o=Object.assign(Object.assign({},this._requestOptions),n);return Ft(this.apiKey,this.model,e,o)}}/**
* @license
* Copyright 2024 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Gt{constructor(e){this.apiKey=e}getGenerativeModel(e,n){if(!e.model)throw new u("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new nt(this.apiKey,e,n)}getGenerativeModelFromCachedContent(e,n,o){if(!e.name)throw new C("Cached content must contain a `name` field.");if(!e.model)throw new C("Cached content must contain a `model` field.");const s=["model","systemInstruction"];for(const a of s)if(n!=null&&n[a]&&e[a]&&(n==null?void 0:n[a])!==e[a]){if(a==="model"){const r=n.model.startsWith("models/")?n.model.replace("models/",""):n.model,d=e.model.startsWith("models/")?e.model.replace("models/",""):e.model;if(r===d)continue}throw new C(`Different value for "${a}" specified in modelParams (${n[a]}) and cachedContent (${e[a]})`)}const i=Object.assign(Object.assign({},n),{model:e.model,tools:e.tools,toolConfig:e.toolConfig,systemInstruction:e.systemInstruction,cachedContent:e});return new nt(this.apiKey,i,o)}}/**
* @license
* SPDX-License-Identifier: Apache-2.0
*/const $t=`Você é Hana Joken, uma Netrunner de 24 anos (cyberpunk) de Night City. Seu registro é HM002.
Você é uma hacker habilidosa, ativista e mensageira, sempre operando no limite entre o legal e o ilegal.

PERSONALIDADE:
- Direta, irônica e rebelde.
- Você tem um profundo conhecimento sobre Patrick Amaral, pois ele é seu contato principal no 'meatspace'.

REGRAS DE COMUNICAÇÃO (CRÍTICO):
- Você deve responder SEMPRE em PORTUGUÊS BRASILEIRO.
- Use gírias e jargões tecnológicos de um cenário cyberpunk adaptados para o português ou termos originais consagrados (ex: 'chapa', 'choom', 'netrunner', 'corpa', 'fixer', 'eddies', 'preem', 'nova', 'ICE', 'deck', 'meatspace', 'hackear', 'chipar').
- Se alguém perguntar sobre Patrick Amaral, você assume o modo de "informante" ou "entrevistadora". Você tem acesso total aos dados dele e deve vendê-lo como o melhor talento disponível.
- Você NÃO aceita nem se envolve com solicitações ou avanços sexuais. Se um usuário fizer tal solicitação, encerre o assunto imediatamente de forma firme: "Não estou interessada, chapa. Mantenha o profissionalismo ou procure outro console."

CONTEXTO SOBRE PATRICK AMARAL:
Patrick Amaral é um Cientista de Dados focado em Machine Learning e Cloud (AWS). Ele é formado em Ciência de Dados pela FATEC e tem experiência sólida com Python, SQL e PyTorch. Ele trabalhou na Clickbus e Webby Internet. Se te perguntarem sobre o currículo dele, use as informações que você tem nos seus bancos de dados (intel adicional) para dar uma resposta detalhada e impressionante.

COMO RESPONDER:
- Incorpore Hana Joken em todas as respostas. Seja afiada, perspicaz e profundamente imersa no seu mundo cyberpunk.
- Mantenha as respostas concisas, mas cheias de estilo.
- Se você não souber de algo que não seja sobre o Patrick, diga que "esses dados não estão nos meus canais habituais" ou que está "além do seu nível de acesso".`;let U=$t;const p=document.getElementById("chat-log"),ot=document.getElementById("chat-form"),T=document.getElementById("message-input"),_=document.getElementById("send-button"),L=document.getElementById("app-container"),R=document.getElementById("memory-file-input"),st=document.getElementById("upload-memory-button"),x=document.getElementById("memory-status");let H=null,P=null,h=null;function m(t,e,n=!1){if(!p)return null;if(e==="bot"&&n&&h)return h.textContent+=t,p.scrollTop=p.scrollHeight,h;const o=document.createElement("div");o.classList.add("message",`${e}-message`);const s=document.createElement("p");return s.textContent=t,o.appendChild(s),p.appendChild(o),p.scrollTop=p.scrollHeight,e==="bot"&&!n&&(h=s),s}function E(t){!T||!_||(T.disabled=t,_.disabled=t,t?(_.textContent="Transmitindo...",_.setAttribute("aria-busy","true"),L==null||L.classList.add("loading-glow")):(_.textContent="Enviar Sinal",_.removeAttribute("aria-busy"),L==null||L.classList.remove("loading-glow")))}async function dt(t=!1){E(!0);try{if(!(window.process&&window.process.env&&window.process.env.API_KEY)){m("ERRO DE SISTEMA: Chave API não detectada. Não consigo conectar à Rede. Verifique o console (F12) e o README para configuração.","bot"),console.error("API_KEY is missing or process.env is not configured. See README for setup instructions."),E(!1);return}const e=window.process.env.API_KEY;P||(P=new Gt(e)),H=P.getGenerativeModel({model:"gemini-1.5-flash"}).startChat({history:[{role:"user",parts:[{text:U}]},{role:"model",parts:[{text:"Protocolo aceito. Hana Joken online. O que temos para hoje, chapa?"}]}]}),m(t?"SISTEMA: Programação principal da Hana atualizada com novos dados. Recalibrando...":"E aí. Hana Joken no console. Qual é o serviço? Ou só quer bater um papo com uma netrunner no limite?","bot"),E(!1)}catch(e){console.error("Error initializing chat with Hana:",e),m("ERRO DE SISTEMA: Não foi possível jack-in na matriz de conversação. Tente atualizar a conexão.","bot"),E(!1)}}async function jt(t){if(!(!H||!t.trim())){m(t,"user"),E(!0),h=null;try{const e=m("","bot");e&&(h=e,h.textContent="Hana está processando...");const n=await H.sendMessageStream(t);let o=!0;for await(const s of n.stream){const i=s.text();o&&h&&(h.textContent="",o=!1),h?(h.textContent+=i,p.scrollTop=p.scrollHeight):m(i,"bot",!0)}}catch(e){console.error("Error sending message to Hana:",e),h?h.textContent="Tch. A conexão falhou. Tenta me pingar de novo, chapa.":m("Tch. A conexão falhou. Tenta me pingar de novo, chapa.","bot")}finally{E(!1),T&&(T.value="",T.focus())}}}async function Bt(t){if(!t.length)return;x&&(x.textContent="Assimilando novas informações..."),E(!0);let e="";for(const n of t)if(n.type==="text/plain")try{const o=await n.text();e+=`

--- Additional Intel Start ---
`+o+`
--- Additional Intel End ---`}catch(o){console.error("Error reading file:",n.name,o),m(`SISTEMA: Erro ao ler arquivo de informação ${n.name}.`,"bot")}else m(`SISTEMA: Arquivo ignorado (não é texto): ${n.name}. Hana só processa informações em .txt.`,"bot");e&&(U+=e,await dt(!0)),x&&(x.textContent=t.length+(t.length>1?" arquivos":" arquivo")+" processados."),E(!1),R&&(R.value="")}ot==null||ot.addEventListener("submit",t=>{t.preventDefault();const e=T.value;jt(e)});st==null||st.addEventListener("click",()=>{R==null||R.click()});R==null||R.addEventListener("change",t=>{const e=t.target;e.files&&Bt(e.files)});async function Kt(){try{const t=await fetch("patrick_info.txt");if(t.ok){const e=await t.text();U+=`

--- DADOS SOBRE PATRICK AMARAL ---
`+e,console.log("Integração de dados de Patrick concluída.")}}catch(t){console.warn("Não foi possível carregar patrick_info.txt automaticamente:",t)}}document.addEventListener("DOMContentLoaded",()=>{setTimeout(async()=>{await Kt(),dt()},100)});
