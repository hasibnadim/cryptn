export const getMYIp = async (cb: Function) => {
  var json: any = await fetch('https://api.ipify.org/?format=json')
  cb(await json.json())
}
