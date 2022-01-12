import { highlightCardPairs,autoFlip,resetUser } from "../user"

let app
export const initUI = () => {
  app = new Vue({
    el: '#app',
    data: {
      seen: false,
      resetSeen:false
    },
    methods: {
      highlight: function () {
        highlightCardPairs()
      },
      flip: function () {
        autoFlip()
      },
      reset: function () {
        resetUser();
        hideResetButton();
      },
    }
  })

}

export const showUI = () => {
  app.seen = true;
}

export const showResetButton = () => {
  app.resetSeen = true;
  app.seen = false;
}

export const hideResetButton = () => {
  app.resetSeen = false;
  app.seen = true;
}
