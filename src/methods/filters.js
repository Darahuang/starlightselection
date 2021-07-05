export function dollarSignThousandth(dollar) {
  const dollarSign = `${dollar}`;
  const parts = dollarSign.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `NT$${parts.join('.')}`;
}

export function date(time) {
  const localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}
