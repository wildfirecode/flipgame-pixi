import { highlightCardPairs,autoFlip } from "../user"

let app
export const initUI = () => {
  app = new Vue({
    el: '#app',
    data: {
      seen: false
    },
    methods: {
      highlight: function () {
        highlightCardPairs()
      },
      flip: function () {
        autoFlip()
      },
    }
  })

}

export const showUI = () => {
  app.seen = true;
}
