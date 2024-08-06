
export const getProvince = async () => {
    const res = fetch("https://api.binderbyte.com/wilayah/provinsi?api_key=219fc27777d737478db21aa4121cd9a31564acac720c192c93cd7f70e80f6b1e", {
        method: 'GET',
        redirect: 'follow'
    })
        .then(response => response.text())
        .then(result => JSON.parse(result)?.value)
        .catch(error => console.log('error', error));

    return res;
}

export const getState = async (provinceID: string) => {
    const res = fetch(`https://api.binderbyte.com/wilayah/kabupaten?api_key=219fc27777d737478db21aa4121cd9a31564acac720c192c93cd7f70e80f6b1e&id_provinsi=${provinceID}`, {
        method: 'GET',
        redirect: 'follow'
    })
        .then(response => response.text())
        .then(result => JSON.parse(result)?.value)
        .catch(error => console.log('error', error));

    return res;
}

export const getCity = async (cityID: string) => {
    const res = fetch(`https://api.binderbyte.com/wilayah/kecamatan?api_key=219fc27777d737478db21aa4121cd9a31564acac720c192c93cd7f70e80f6b1e&id_kabupaten=${cityID}`, {
        method: 'GET',
        redirect: 'follow'
    })
        .then(response => response.text())
        .then(result => JSON.parse(result)?.value)
        .catch(error => console.log('error', error));

    return res;
}