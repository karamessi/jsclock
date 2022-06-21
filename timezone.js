const selectorOptions = moment.tz
  .names()
  .reduce((memo, tz) => {
    memo.push({
      name: tz,
      offset: moment.tz(tz).utcOffset(),
    });

    return memo;
  }, [])
  .sort((a, b) => {
    return a.offset - b.offset;
  })
  .reduce((memo, tz) => {
    const timezone = tz.offset ? moment.tz(tz.name).format('Z') : '';

    return memo.concat(
      `<option value="${tz.name}" data-tz="${timezone}">(GMT${timezone}) ${tz.name}</option>`
    );
  }, '');

const timezoneSelector = document.getElementById('tzSelector');
timezoneSelector.innerHTML = selectorOptions;
timezoneSelector.value = Intl.DateTimeFormat().resolvedOptions().timeZone;

const getTz2 = () => {
  var selectedIndex = timezoneSelector.selectedIndex;
  return timezoneSelector.options[selectedIndex].dataset.tz;
};

const getTz = () => {
  return timezoneSelector.value;
};
