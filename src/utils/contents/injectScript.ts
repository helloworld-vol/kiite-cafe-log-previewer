const requestIdleCallback =
  (window as any).requestIdleCallback || requestAnimationFrame;

/**
 * @description 渡されたコードを注入するScriptタグなどを管理するClass
 */
export class InjectScriptClass {
  private injectedScript?: HTMLScriptElement;

  /**
   *  @description 渡されたコードを実行するScriptタグを注入する
   */
  inject(code: string, onComplete?: (document: Document) => void) {
    if (this.injectedScript) return;

    if (!document.head || !document.body) {
      return requestIdleCallback(() => this.inject(code, onComplete));
    }

    const script = document.createElement("script");

    script.classList.add("__KCLP_SCRIPT__");
    script.type = "text/javascript";
    script.innerHTML = code;

    this.injectedScript = script;
    document.head.appendChild(script);

    if (onComplete) onComplete(document);
  }

  /**
   * @description 注入されたScriptを削除
   */
  remove(onComplete?: (document: Document) => void) {
    if (!document.head || !document.body) {
      return requestIdleCallback(() => this.remove(onComplete));
    }

    if (this.injectedScript) {
      document.head.removeChild(this.injectedScript);
    }

    this.injectedScript = void 0;

    onComplete(document);
  }
}
