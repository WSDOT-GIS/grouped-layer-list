const { publish } = require("gh-pages");

publish("packages/demo", {
    src: ["dist/**/*", "index.*"]
}, err => {
    if (err) {
        console.error("error publishing to gh-pages.", err);
    } else {
        console.log("published to gh-pages");
    }
})