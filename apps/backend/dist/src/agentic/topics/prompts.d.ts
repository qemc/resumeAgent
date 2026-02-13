export declare const singleTopicPromptEn: import("@langchain/core/prompts").ChatPromptTemplate<any, any>;
export declare const singleTopicPromptPl: import("@langchain/core/prompts").ChatPromptTemplate<any, any>;
export declare const unifyPromptEn: import("@langchain/core/prompts").ChatPromptTemplate<any, any>;
export declare const unifyPromptPl: import("@langchain/core/prompts").ChatPromptTemplate<any, any>;
export declare const unify_strategy_and_reasoning_en = "Briefly explain the rewriting strategy. Specify how unique starting verbs were selected to prevent repetition and how similar topics (e.g., infrastructure) were differentiated based on technical specifics. Confirm the removal of emotive or hyperbolic language in favor of a clinical, objective tone.";
export declare const refined_topic_en = "The rewritten, humble, and cold bullet point.";
export declare const original_id_en = "The ID provided in the input context. Do not change this.";
export declare const unify_strategy_and_reasoning_pl = "Kr\u00F3tkie uzasadnienie przyj\u0119tej strategii. Wyja\u015Bnij, w jaki spos\u00F3b dobrano unikalne czasowniki rozpoczynaj\u0105ce zdania (aby unikn\u0105\u0107 powt\u00F3rze\u0144) oraz jak technicznie zr\u00F3\u017Cnicowano zbli\u017Cone tematy (np. infrastruktura). Potwierd\u017A usuni\u0119cie \"nadmuchanego\" s\u0142ownictwa na rzecz surowych fakt\u00F3w.";
export declare const refined_topic_pl = "Przeredagowany punkt listy utrzymany w tonie klinicznym, obiektywnym i skromnym.";
export declare const original_id_pl = "Oryginalne ID pobrane z danych wej\u015Bciowych. Nie modyfikuj go.";
export declare const checkEnhanceAccuracyPromptEn: import("@langchain/core/prompts").ChatPromptTemplate<any, any>;
export declare const checkEnhanceAccuracyPromptPl: import("@langchain/core/prompts").ChatPromptTemplate<any, any>;
export declare const check_update_en = "true if ANY content was added, removed, or meaningfully reworded. false ONLY if the texts are essentially identical (cosmetic typo fixes only).";
export declare const check_update_pl = "true je\u015Bli JAK\u0104KOLWIEK tre\u015B\u0107 dodano, usuni\u0119to lub istotnie przeformu\u0142owano. false TYLKO je\u015Bli teksty s\u0105 zasadniczo identyczne (wy\u0142\u0105cznie kosmetyczne poprawki).";
export declare const single_topic_reason_en = "Step-by-step reasoning. Identify the specific skills in the raw input that match the target persona. Explicitly state which 'hyperbolic' words you will avoid.";
export declare const single_topic_reason_pl = "Rozumowanie krok po kroku. Zidentyfikuj w tek\u015Bcie \u017Ar\u00F3d\u0142owym konkretne umiej\u0119tno\u015Bci, kt\u00F3re pasuj\u0105 do docelowej persony. Wyra\u017Anie okre\u015Bl, kt\u00F3rych \u201Ehiperbolicznych\u201D s\u0142\u00F3w zamierzasz unika\u0107.";
export declare const bullet_point_en = "The final, polished, and grounded bullet point (1-2 sentences max).";
export declare const bullet_point_pl = "Ostateczny, dopracowany i rzeczowy punkt listy (maksymalnie 1-2 zdania).";
//# sourceMappingURL=prompts.d.ts.map