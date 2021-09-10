
export function hasKey<ObjTest>(obj: ObjTest, key: PropertyKey): key is keyof ObjTest {
  return key in obj
}

export function hasValue<ObjTest>(O:ObjTest,value:string){
  return value in Object.values(O);
}

/**
 * @param date Object with instanceof Date;
 * @param divider sting divider betwen date and time
 * @returns example: 19 January 2021 - 17:30
 */

export const toReadableDate=(date:Date,divider:string="")=>{
  let tahun = date.getFullYear();
  let bulan:string|number = date.getMonth();
  let tanggal = date.getDate();
  // let hari:string|number = date.getDay();
  let jam:number|string = date.getHours();
  let menit:number|string = date.getMinutes();
  // let detik = date.getSeconds();

  switch(bulan) {
    case 0: bulan = "January"; break;
    case 1: bulan = "February"; break;
    case 2: bulan = "March"; break;
    case 3: bulan = "April"; break;
    case 4: bulan = "May"; break;
    case 5: bulan = "Juny"; break;
    case 6: bulan = "July"; break;
    case 7: bulan = "August"; break;
    case 8: bulan = "September"; break;
    case 9: bulan = "October"; break;
    case 10: bulan = "November"; break;
    case 11: bulan = "December"; break;
  }

  let tampilTanggal = tanggal+" "+bulan+" "+tahun;

  if(jam.toString().length === 1){
    jam='0'+jam.toString();
  }

  if(menit.toString().length === 1){
    menit='0'+menit.toString();
  }

  let tampilWaktu = jam+":"+menit;

  return tampilTanggal+" "+divider.replace(/\s/g,"")+" "+tampilWaktu;
}


/**
 * Digunakan untuk mencari perbedaan 2 Date Objek
 * @param date date yg sekiranya lebih kecil
 * @returns object perbedaan tanggal
 */

const difDate=(date:Date,date2:Date=new Date())=>{

  let milsec=date.getTime();
  let milsec2=date2.getTime();


  //Jika date1 lebih besar dr date 2 maka dibalik
  if(milsec>date2.getTime()){
    let newDate={...date};
    let newDate2={...date2};
    date=newDate2;
    date2=newDate;
  }

  let diffTime = Math.abs(milsec2 - milsec);

  const diffDate=new Date(diffTime);

  let tahun = diffDate.getFullYear()-1970;
  let bulan:string|number = diffDate.getUTCMonth();
  let tanggal = diffDate.getUTCDate()-1;
  let jam = diffDate.getUTCHours();
  let menit = diffDate.getUTCMinutes();
  let detik = diffDate.getUTCSeconds();

  let beda:{
    year:number,
    month:number,
    date:number,
    hour:number,
    minute:number,
    second:number,
  }={
    year:tahun,
    month:bulan,
    date:tanggal,
    hour:jam,
    minute:menit,
    second:detik,
  }

  return beda;
}


export const understandableDate=(date:Date,maxDate=16)=>{

  const dif=difDate(date);

  if(dif.year===0 && dif.month===0 && dif.date<maxDate){

    if(dif.date){
      return dif.date+" days ago";
    }

    if(dif.hour){
      return dif.hour+" hours ago";
    }

    if(dif.minute){
      return dif.minute+" minutes ago";
    }

    if(dif.second){
      return dif.second+" seconds ago";
    }

  }

  return toReadableDate(date);

}

export const downloadFile = function(file:Blob|File|string,filename:string){
  const url=((file instanceof File) || (file instanceof Blob))?URL.createObjectURL(file):file;

  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.click();
}