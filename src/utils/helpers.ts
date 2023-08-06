export default function convertToDate(dateString: string) {
  let d = dateString.split("/");
  let date = new Date(d[2] + '/' + d[1] + '/' + d[0]);
  return date;     
}