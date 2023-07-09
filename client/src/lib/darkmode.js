const dark = {
  bg: "#282c34",
  text: "#f7f5f5"
};
const light = {
  bg: "white",
  text: "black"
};

function applyToClass(className, cb) {
  for (const doc of document.getElementsByClassName(className)) cb(doc)
}

function applyTheme(doc, theme) {
  doc.style.background = theme.bg;
  doc.style.color = theme.text;
}

const handleDarkModeChange = (isDark) => {
  let theme = isDark ? dark : light;
  applyToClass("product-card", doc => {
    applyTheme(doc, theme)
  });

  applyTheme(document.body, theme);
};

export default handleDarkModeChange;