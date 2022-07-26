(function () {
  const XHR = XMLHttpRequest.prototype;
  const send = XHR.send;

  XHR.send = function (...args) {
    const onLoad = () => {
      console.log("::: KCLP ::: listening ...");

      if (this.responseURL.includes("${this.listenUrl}")) {
        const dom = document.getElementById("${this.id}");

        if (dom) {
          dom.innerText += this.response + "|";
        } else {
          XHR.send = send;
        }
      }
    };

    this.addEventListener("load", onLoad);

    // eslint-disable-next-line prefer-rest-params
    return send.apply(this, args);
  };
})();

export const LISTEN_URL = "hoge";
