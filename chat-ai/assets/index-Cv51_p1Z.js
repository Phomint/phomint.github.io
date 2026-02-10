(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();var j;(function(e){e.STRING="string",e.NUMBER="number",e.INTEGER="integer",e.BOOLEAN="boolean",e.ARRAY="array",e.OBJECT="object"})(j||(j={}));/**
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
 */var F;(function(e){e.LANGUAGE_UNSPECIFIED="language_unspecified",e.PYTHON="python"})(F||(F={}));var $;(function(e){e.OUTCOME_UNSPECIFIED="outcome_unspecified",e.OUTCOME_OK="outcome_ok",e.OUTCOME_FAILED="outcome_failed",e.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})($||($={}));/**
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
 */const K=["user","model","function","system"];var q;(function(e){e.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",e.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",e.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",e.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",e.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",e.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(q||(q={}));var Y;(function(e){e.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",e.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",e.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",e.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",e.BLOCK_NONE="BLOCK_NONE"})(Y||(Y={}));var V;(function(e){e.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",e.NEGLIGIBLE="NEGLIGIBLE",e.LOW="LOW",e.MEDIUM="MEDIUM",e.HIGH="HIGH"})(V||(V={}));var J;(function(e){e.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",e.SAFETY="SAFETY",e.OTHER="OTHER"})(J||(J={}));var N;(function(e){e.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",e.STOP="STOP",e.MAX_TOKENS="MAX_TOKENS",e.SAFETY="SAFETY",e.RECITATION="RECITATION",e.LANGUAGE="LANGUAGE",e.BLOCKLIST="BLOCKLIST",e.PROHIBITED_CONTENT="PROHIBITED_CONTENT",e.SPII="SPII",e.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",e.OTHER="OTHER"})(N||(N={}));var W;(function(e){e.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",e.RETRIEVAL_QUERY="RETRIEVAL_QUERY",e.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",e.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",e.CLASSIFICATION="CLASSIFICATION",e.CLUSTERING="CLUSTERING"})(W||(W={}));var X;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.AUTO="AUTO",e.ANY="ANY",e.NONE="NONE"})(X||(X={}));var z;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.MODE_DYNAMIC="MODE_DYNAMIC"})(z||(z={}));/**
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
 */class u extends Error{constructor(t){super(`[GoogleGenerativeAI Error]: ${t}`)}}class y extends u{constructor(t,n){super(t),this.response=n}}class ie extends u{constructor(t,n,o,s){super(t),this.status=n,this.statusText=o,this.errorDetails=s}}class v extends u{}class ae extends u{}/**
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
 */const ue="https://generativelanguage.googleapis.com",fe="v1beta",he="0.24.1",ge="genai-js";var I;(function(e){e.GENERATE_CONTENT="generateContent",e.STREAM_GENERATE_CONTENT="streamGenerateContent",e.COUNT_TOKENS="countTokens",e.EMBED_CONTENT="embedContent",e.BATCH_EMBED_CONTENTS="batchEmbedContents"})(I||(I={}));class Ee{constructor(t,n,o,s,i){this.model=t,this.task=n,this.apiKey=o,this.stream=s,this.requestOptions=i}toString(){var t,n;const o=((t=this.requestOptions)===null||t===void 0?void 0:t.apiVersion)||fe;let i=`${((n=this.requestOptions)===null||n===void 0?void 0:n.baseUrl)||ue}/${o}/${this.model}:${this.task}`;return this.stream&&(i+="?alt=sse"),i}}function me(e){const t=[];return e!=null&&e.apiClient&&t.push(e.apiClient),t.push(`${ge}/${he}`),t.join(" ")}async function pe(e){var t;const n=new Headers;n.append("Content-Type","application/json"),n.append("x-goog-api-client",me(e.requestOptions)),n.append("x-goog-api-key",e.apiKey);let o=(t=e.requestOptions)===null||t===void 0?void 0:t.customHeaders;if(o){if(!(o instanceof Headers))try{o=new Headers(o)}catch(s){throw new v(`unable to convert customHeaders value ${JSON.stringify(o)} to Headers: ${s.message}`)}for(const[s,i]of o.entries()){if(s==="x-goog-api-key")throw new v(`Cannot set reserved header name ${s}`);if(s==="x-goog-api-client")throw new v(`Header name ${s} can only be set using the apiClient field`);n.append(s,i)}}return n}async function Ce(e,t,n,o,s,i){const a=new Ee(e,t,n,o,i);return{url:a.toString(),fetchOptions:Object.assign(Object.assign({},Oe(i)),{method:"POST",headers:await pe(a),body:s})}}async function L(e,t,n,o,s,i={},a=fetch){const{url:r,fetchOptions:l}=await Ce(e,t,n,o,s,i);return ve(r,l,a)}async function ve(e,t,n=fetch){let o;try{o=await n(e,t)}catch(s){_e(s,e)}return o.ok||await Ie(o,e),o}function _e(e,t){let n=e;throw n.name==="AbortError"?(n=new ae(`Request aborted when fetching ${t.toString()}: ${e.message}`),n.stack=e.stack):e instanceof ie||e instanceof v||(n=new u(`Error fetching from ${t.toString()}: ${e.message}`),n.stack=e.stack),n}async function Ie(e,t){let n="",o;try{const s=await e.json();n=s.error.message,s.error.details&&(n+=` ${JSON.stringify(s.error.details)}`,o=s.error.details)}catch{}throw new ie(`Error fetching from ${t.toString()}: [${e.status} ${e.statusText}] ${n}`,e.status,e.statusText,o)}function Oe(e){const t={};if((e==null?void 0:e.signal)!==void 0||(e==null?void 0:e.timeout)>=0){const n=new AbortController;(e==null?void 0:e.timeout)>=0&&setTimeout(()=>n.abort(),e.timeout),e!=null&&e.signal&&e.signal.addEventListener("abort",()=>{n.abort()}),t.signal=n.signal}return t}/**
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
 */function P(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),D(e.candidates[0]))throw new y(`${m(e)}`,e);return Re(e)}else if(e.promptFeedback)throw new y(`Text not available. ${m(e)}`,e);return""},e.functionCall=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),D(e.candidates[0]))throw new y(`${m(e)}`,e);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),Q(e)[0]}else if(e.promptFeedback)throw new y(`Function call not available. ${m(e)}`,e)},e.functionCalls=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),D(e.candidates[0]))throw new y(`${m(e)}`,e);return Q(e)}else if(e.promptFeedback)throw new y(`Function call not available. ${m(e)}`,e)},e}function Re(e){var t,n,o,s;const i=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const a of(s=(o=e.candidates)===null||o===void 0?void 0:o[0].content)===null||s===void 0?void 0:s.parts)a.text&&i.push(a.text),a.executableCode&&i.push("\n```"+a.executableCode.language+`
`+a.executableCode.code+"\n```\n"),a.codeExecutionResult&&i.push("\n```\n"+a.codeExecutionResult.output+"\n```\n");return i.length>0?i.join(""):""}function Q(e){var t,n,o,s;const i=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const a of(s=(o=e.candidates)===null||o===void 0?void 0:o[0].content)===null||s===void 0?void 0:s.parts)a.functionCall&&i.push(a.functionCall);if(i.length>0)return i}const Ae=[N.RECITATION,N.SAFETY,N.LANGUAGE];function D(e){return!!e.finishReason&&Ae.includes(e.finishReason)}function m(e){var t,n,o;let s="";if((!e.candidates||e.candidates.length===0)&&e.promptFeedback)s+="Response was blocked",!((t=e.promptFeedback)===null||t===void 0)&&t.blockReason&&(s+=` due to ${e.promptFeedback.blockReason}`),!((n=e.promptFeedback)===null||n===void 0)&&n.blockReasonMessage&&(s+=`: ${e.promptFeedback.blockReasonMessage}`);else if(!((o=e.candidates)===null||o===void 0)&&o[0]){const i=e.candidates[0];D(i)&&(s+=`Candidate was blocked due to ${i.finishReason}`,i.finishMessage&&(s+=`: ${i.finishMessage}`))}return s}function w(e){return this instanceof w?(this.v=e,this):new w(e)}function ye(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var o=n.apply(e,t||[]),s,i=[];return s={},a("next"),a("throw"),a("return"),s[Symbol.asyncIterator]=function(){return this},s;function a(d){o[d]&&(s[d]=function(c){return new Promise(function(f,A){i.push([d,c,f,A])>1||r(d,c)})})}function r(d,c){try{l(o[d](c))}catch(f){R(i[0][3],f)}}function l(d){d.value instanceof w?Promise.resolve(d.value.v).then(g,O):R(i[0][2],d)}function g(d){r("next",d)}function O(d){r("throw",d)}function R(d,c){d(c),i.shift(),i.length&&r(i[0][0],i[0][1])}}/**
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
 */const Z=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function Se(e){const t=e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),n=Ne(t),[o,s]=n.tee();return{stream:be(o),response:Te(s)}}async function Te(e){const t=[],n=e.getReader();for(;;){const{done:o,value:s}=await n.read();if(o)return P(we(t));t.push(s)}}function be(e){return ye(this,arguments,function*(){const n=e.getReader();for(;;){const{value:o,done:s}=yield w(n.read());if(s)break;yield yield w(P(o))}})}function Ne(e){const t=e.getReader();return new ReadableStream({start(o){let s="";return i();function i(){return t.read().then(({value:a,done:r})=>{if(r){if(s.trim()){o.error(new u("Failed to parse stream"));return}o.close();return}s+=a;let l=s.match(Z),g;for(;l;){try{g=JSON.parse(l[1])}catch{o.error(new u(`Error parsing JSON response: "${l[1]}"`));return}o.enqueue(g),s=s.substring(l[0].length),l=s.match(Z)}return i()}).catch(a=>{let r=a;throw r.stack=a.stack,r.name==="AbortError"?r=new ae("Request aborted when reading from the stream"):r=new u("Error reading from the stream"),r})}}})}function we(e){const t=e[e.length-1],n={promptFeedback:t==null?void 0:t.promptFeedback};for(const o of e){if(o.candidates){let s=0;for(const i of o.candidates)if(n.candidates||(n.candidates=[]),n.candidates[s]||(n.candidates[s]={index:s}),n.candidates[s].citationMetadata=i.citationMetadata,n.candidates[s].groundingMetadata=i.groundingMetadata,n.candidates[s].finishReason=i.finishReason,n.candidates[s].finishMessage=i.finishMessage,n.candidates[s].safetyRatings=i.safetyRatings,i.content&&i.content.parts){n.candidates[s].content||(n.candidates[s].content={role:i.content.role||"user",parts:[]});const a={};for(const r of i.content.parts)r.text&&(a.text=r.text),r.functionCall&&(a.functionCall=r.functionCall),r.executableCode&&(a.executableCode=r.executableCode),r.codeExecutionResult&&(a.codeExecutionResult=r.codeExecutionResult),Object.keys(a).length===0&&(a.text=""),n.candidates[s].content.parts.push(a)}s++}o.usageMetadata&&(n.usageMetadata=o.usageMetadata)}return n}/**
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
 */async function re(e,t,n,o){const s=await L(t,I.STREAM_GENERATE_CONTENT,e,!0,JSON.stringify(n),o);return Se(s)}async function ce(e,t,n,o){const i=await(await L(t,I.GENERATE_CONTENT,e,!1,JSON.stringify(n),o)).json();return{response:P(i)}}/**
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
 */function le(e){if(e!=null){if(typeof e=="string")return{role:"system",parts:[{text:e}]};if(e.text)return{role:"system",parts:[e]};if(e.parts)return e.role?e:{role:"system",parts:e.parts}}}function M(e){let t=[];if(typeof e=="string")t=[{text:e}];else for(const n of e)typeof n=="string"?t.push({text:n}):t.push(n);return Me(t)}function Me(e){const t={role:"user",parts:[]},n={role:"function",parts:[]};let o=!1,s=!1;for(const i of e)"functionResponse"in i?(n.parts.push(i),s=!0):(t.parts.push(i),o=!0);if(o&&s)throw new u("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!o&&!s)throw new u("No content is provided for sending chat message.");return o?t:n}function Le(e,t){var n;let o={model:t==null?void 0:t.model,generationConfig:t==null?void 0:t.generationConfig,safetySettings:t==null?void 0:t.safetySettings,tools:t==null?void 0:t.tools,toolConfig:t==null?void 0:t.toolConfig,systemInstruction:t==null?void 0:t.systemInstruction,cachedContent:(n=t==null?void 0:t.cachedContent)===null||n===void 0?void 0:n.name,contents:[]};const s=e.generateContentRequest!=null;if(e.contents){if(s)throw new v("CountTokensRequest must have one of contents or generateContentRequest, not both.");o.contents=e.contents}else if(s)o=Object.assign(Object.assign({},o),e.generateContentRequest);else{const i=M(e);o.contents=[i]}return{generateContentRequest:o}}function ee(e){let t;return e.contents?t=e:t={contents:[M(e)]},e.systemInstruction&&(t.systemInstruction=le(e.systemInstruction)),t}function xe(e){return typeof e=="string"||Array.isArray(e)?{content:M(e)}:e}/**
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
 */const te=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],De={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function Ge(e){let t=!1;for(const n of e){const{role:o,parts:s}=n;if(!t&&o!=="user")throw new u(`First content should be with role 'user', got ${o}`);if(!K.includes(o))throw new u(`Each item should include role field. Got ${o} but valid roles are: ${JSON.stringify(K)}`);if(!Array.isArray(s))throw new u("Content should have 'parts' property with an array of Parts");if(s.length===0)throw new u("Each Content should have at least one part");const i={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const r of s)for(const l of te)l in r&&(i[l]+=1);const a=De[o];for(const r of te)if(!a.includes(r)&&i[r]>0)throw new u(`Content with role '${o}' can't contain '${r}' part`);t=!0}}function ne(e){var t;if(e.candidates===void 0||e.candidates.length===0)return!1;const n=(t=e.candidates[0])===null||t===void 0?void 0:t.content;if(n===void 0||n.parts===void 0||n.parts.length===0)return!1;for(const o of n.parts)if(o===void 0||Object.keys(o).length===0||o.text!==void 0&&o.text==="")return!1;return!0}/**
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
 */const oe="SILENT_ERROR";class He{constructor(t,n,o,s={}){this.model=n,this.params=o,this._requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=t,o!=null&&o.history&&(Ge(o.history),this._history=o.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(t,n={}){var o,s,i,a,r,l;await this._sendPromise;const g=M(t),O={safetySettings:(o=this.params)===null||o===void 0?void 0:o.safetySettings,generationConfig:(s=this.params)===null||s===void 0?void 0:s.generationConfig,tools:(i=this.params)===null||i===void 0?void 0:i.tools,toolConfig:(a=this.params)===null||a===void 0?void 0:a.toolConfig,systemInstruction:(r=this.params)===null||r===void 0?void 0:r.systemInstruction,cachedContent:(l=this.params)===null||l===void 0?void 0:l.cachedContent,contents:[...this._history,g]},R=Object.assign(Object.assign({},this._requestOptions),n);let d;return this._sendPromise=this._sendPromise.then(()=>ce(this._apiKey,this.model,O,R)).then(c=>{var f;if(ne(c.response)){this._history.push(g);const A=Object.assign({parts:[],role:"model"},(f=c.response.candidates)===null||f===void 0?void 0:f[0].content);this._history.push(A)}else{const A=m(c.response);A&&console.warn(`sendMessage() was unsuccessful. ${A}. Inspect response object for details.`)}d=c}).catch(c=>{throw this._sendPromise=Promise.resolve(),c}),await this._sendPromise,d}async sendMessageStream(t,n={}){var o,s,i,a,r,l;await this._sendPromise;const g=M(t),O={safetySettings:(o=this.params)===null||o===void 0?void 0:o.safetySettings,generationConfig:(s=this.params)===null||s===void 0?void 0:s.generationConfig,tools:(i=this.params)===null||i===void 0?void 0:i.tools,toolConfig:(a=this.params)===null||a===void 0?void 0:a.toolConfig,systemInstruction:(r=this.params)===null||r===void 0?void 0:r.systemInstruction,cachedContent:(l=this.params)===null||l===void 0?void 0:l.cachedContent,contents:[...this._history,g]},R=Object.assign(Object.assign({},this._requestOptions),n),d=re(this._apiKey,this.model,O,R);return this._sendPromise=this._sendPromise.then(()=>d).catch(c=>{throw new Error(oe)}).then(c=>c.response).then(c=>{if(ne(c)){this._history.push(g);const f=Object.assign({},c.candidates[0].content);f.role||(f.role="model"),this._history.push(f)}else{const f=m(c);f&&console.warn(`sendMessageStream() was unsuccessful. ${f}. Inspect response object for details.`)}}).catch(c=>{c.message!==oe&&console.error(c)}),d}}/**
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
 */async function Ue(e,t,n,o){return(await L(t,I.COUNT_TOKENS,e,!1,JSON.stringify(n),o)).json()}/**
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
 */async function ke(e,t,n,o){return(await L(t,I.EMBED_CONTENT,e,!1,JSON.stringify(n),o)).json()}async function Pe(e,t,n,o){const s=n.requests.map(a=>Object.assign(Object.assign({},a),{model:t}));return(await L(t,I.BATCH_EMBED_CONTENTS,e,!1,JSON.stringify({requests:s}),o)).json()}/**
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
 */class se{constructor(t,n,o={}){this.apiKey=t,this._requestOptions=o,n.model.includes("/")?this.model=n.model:this.model=`models/${n.model}`,this.generationConfig=n.generationConfig||{},this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=le(n.systemInstruction),this.cachedContent=n.cachedContent}async generateContent(t,n={}){var o;const s=ee(t),i=Object.assign(Object.assign({},this._requestOptions),n);return ce(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(o=this.cachedContent)===null||o===void 0?void 0:o.name},s),i)}async generateContentStream(t,n={}){var o;const s=ee(t),i=Object.assign(Object.assign({},this._requestOptions),n);return re(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(o=this.cachedContent)===null||o===void 0?void 0:o.name},s),i)}startChat(t){var n;return new He(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(n=this.cachedContent)===null||n===void 0?void 0:n.name},t),this._requestOptions)}async countTokens(t,n={}){const o=Le(t,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),s=Object.assign(Object.assign({},this._requestOptions),n);return Ue(this.apiKey,this.model,o,s)}async embedContent(t,n={}){const o=xe(t),s=Object.assign(Object.assign({},this._requestOptions),n);return ke(this.apiKey,this.model,o,s)}async batchEmbedContents(t,n={}){const o=Object.assign(Object.assign({},this._requestOptions),n);return Pe(this.apiKey,this.model,t,o)}}/**
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
 */class Be{constructor(t){this.apiKey=t}getGenerativeModel(t,n){if(!t.model)throw new u("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new se(this.apiKey,t,n)}getGenerativeModelFromCachedContent(t,n,o){if(!t.name)throw new v("Cached content must contain a `name` field.");if(!t.model)throw new v("Cached content must contain a `model` field.");const s=["model","systemInstruction"];for(const a of s)if(n!=null&&n[a]&&t[a]&&(n==null?void 0:n[a])!==t[a]){if(a==="model"){const r=n.model.startsWith("models/")?n.model.replace("models/",""):n.model,l=t.model.startsWith("models/")?t.model.replace("models/",""):t.model;if(r===l)continue}throw new v(`Different value for "${a}" specified in modelParams (${n[a]}) and cachedContent (${t[a]})`)}const i=Object.assign(Object.assign({},n),{model:t.model,tools:t.tools,toolConfig:t.toolConfig,systemInstruction:t.systemInstruction,cachedContent:t});return new se(this.apiKey,i,o)}}/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */const je=`Você é Hana Joken, uma Netrunner de 24 anos (cyberpunk) de Night City. Seu registro é HM002.
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
- Se você não souber de algo que não seja sobre o Patrick, diga que "esses dados não estão nos meus canais habituais" ou que está "além do seu nível de acesso".`;let B=je;const p=document.getElementById("chat-log"),G=document.getElementById("chat-form"),b=document.getElementById("message-input"),S=document.getElementById("send-button"),T=document.getElementById("app-container"),_=document.getElementById("memory-file-input"),H=document.getElementById("upload-memory-button"),x=document.getElementById("memory-status");let k=null,U=null,h=null;function E(e,t,n=!1){if(!p)return null;if(t==="bot"&&n&&h)return h.textContent+=e,p.scrollTop=p.scrollHeight,h;const o=document.createElement("div");o.classList.add("message",`${t}-message`);const s=document.createElement("p");return s.textContent=e,o.appendChild(s),p.appendChild(o),p.scrollTop=p.scrollHeight,t==="bot"&&!n&&(h=s),s}function C(e){!b||!S||(b.disabled=e,S.disabled=e,e?(S.textContent="Transmitindo...",S.setAttribute("aria-busy","true"),T==null||T.classList.add("loading-glow")):(S.textContent="Enviar Sinal",S.removeAttribute("aria-busy"),T==null||T.classList.remove("loading-glow")))}async function de(e=!1){C(!0);try{if(!(window.process&&window.process.env&&window.process.env.API_KEY)){E("ERRO DE SISTEMA: Chave API não detectada. Não consigo conectar à Rede. Verifique o console (F12) e o README para configuração.","bot"),console.error("API_KEY is missing or process.env is not configured. See README for setup instructions."),C(!1);return}const t=window.process.env.API_KEY;U||(U=new Be(t)),k=U.getGenerativeModel({model:"gemini-1.5-flash"}).startChat({history:[{role:"user",parts:[{text:B}]},{role:"model",parts:[{text:"Protocolo aceito. Hana Joken online. O que temos para hoje, chapa?"}]}]}),E(e?"SISTEMA: Programação principal da Hana atualizada com novos dados. Recalibrando...":"E aí. Hana Joken no console. Qual é o serviço? Ou só quer bater um papo com uma netrunner no limite?","bot"),C(!1)}catch(t){console.error("Error initializing chat with Hana:",t),E("ERRO DE SISTEMA: Não foi possível jack-in na matriz de conversação. Tente atualizar a conexão.","bot"),C(!1)}}async function Fe(e){if(!(!k||!e.trim())){E(e,"user"),C(!0),h=null;try{const t=E("","bot");t&&(h=t,h.textContent="Hana está processando...");const n=await k.sendMessageStream(e);let o=!0;for await(const s of n.stream){const i=s.text();o&&h&&(h.textContent="",o=!1),h?(h.textContent+=i,p.scrollTop=p.scrollHeight):E(i,"bot",!0)}}catch(t){console.error("Error sending message to Hana:",t),h?h.textContent="Tch. A conexão falhou. Tenta me pingar de novo, chapa.":E("Tch. A conexão falhou. Tenta me pingar de novo, chapa.","bot")}finally{C(!1),b&&(b.value="",b.focus())}}}async function $e(e){if(!e.length)return;x&&(x.textContent="Assimilando novas informações..."),C(!0);let t="";for(const n of e)if(n.type==="text/plain")try{const o=await n.text();t+=`

--- Additional Intel Start ---
`+o+`
--- Additional Intel End ---`}catch(o){console.error("Error reading file:",n.name,o),E(`SISTEMA: Erro ao ler arquivo de informação ${n.name}.`,"bot")}else E(`SISTEMA: Arquivo ignorado (não é texto): ${n.name}. Hana só processa informações em .txt.`,"bot");t&&(B+=t,await de(!0)),x&&(x.textContent=e.length+(e.length>1?" arquivos":" arquivo")+" processados."),C(!1),_&&(_.value="")}G==null||G.addEventListener("submit",e=>{e.preventDefault();const t=b.value;Fe(t)});H==null||H.addEventListener("click",()=>{_==null||_.click()});_==null||_.addEventListener("change",e=>{const t=e.target;t.files&&$e(t.files)});async function Ke(){try{const e=await fetch("patrick_info.txt");if(e.ok){const t=await e.text();B+=`

--- DADOS SOBRE PATRICK AMARAL ---
`+t,console.log("Integração de dados de Patrick concluída.")}}catch(e){console.warn("Não foi possível carregar patrick_info.txt automaticamente:",e)}}document.addEventListener("DOMContentLoaded",()=>{setTimeout(async()=>{await Ke(),de()},100)});
