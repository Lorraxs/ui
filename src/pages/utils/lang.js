const transList = {};

function format(source, params = []) {
  params.forEach((n, i) => {
    source = source.replace(new RegExp('\\{' + i + '\\}', 'g'), n);
  });
  return source;
}

const Locale = (str, ...args) => {
  // eslint-disable-next-line prefer-const
  let msg = transList[str];
  if (msg) {
    return format(msg, args);
  } else {
    return str;
  }
};

export default Locale;
