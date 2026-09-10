export const states={JHR:'Johor',KDH:'Kedah',KTN:'Kelantan',MLK:'Melaka',NSN:'Negeri Sembilan',PHG:'Pahang',PRK:'Perak',PLS:'Perlis',PNG:'Pulau Pinang',SBH:'Sabah',SWK:'Sarawak',SGR:'Selangor',TRG:'Terengganu',KUL:'W.P. Kuala Lumpur',LBN:'W.P. Labuan',PJY:'W.P. Putrajaya'};
export const all=Object.keys(states), groupA=['KDH','KTN','TRG'], groupB=all.filter(s=>!groupA.includes(s));
export const except=(...s)=>all.filter(x=>!s.includes(x));
export const sources={public:'https://www.kabinet.gov.my/storage/2025/08/HKA-2026.pdf',school:'https://www.moe.gov.my/storage/files/shares/Takwim/Takwim%20Persekolahan/Kalendar%20Akademik%202026.pdf'};
// Stable IDs allow an official override to replace a calculated rule, even when its date changes.
const row=(id,md,nameMs,nameEn,states=['ALL'],category='public')=>({id,md,nameMs,nameEn,states,category});
export const recurring=[
row('newyear','01-01','Tahun Baru','New Year’s Day',except('JHR','KDH','KTN','PLS','TRG')),
row('labour','05-01','Hari Pekerja','Labour Day'),row('national','08-31','Hari Kebangsaan','National Day'),row('malaysia','09-16','Hari Malaysia','Malaysia Day'),row('christmas','12-25','Krismas','Christmas Day'),
row('nsn','01-14','Hari Keputeraan YDPB Negeri Sembilan','Birthday of the Yamtuan Besar',['NSN']),row('territory','02-01','Hari Wilayah Persekutuan','Federal Territory Day',['KUL','LBN','PJY']),row('melaka','02-20','Hari Pengisytiharan Tarikh Kemerdekaan','Declaration of Independence Date',['MLK']),row('trg-install','03-04','Hari Pertabalan Sultan Terengganu','Sultan of Terengganu’s Installation',['TRG']),row('jhr','03-23','Hari Keputeraan Sultan Johor','Sultan of Johor’s Birthday',['JHR']),row('sbh','03-30','Hari Jadi Yang di-Pertua Negeri Sabah','Sabah Governor’s Birthday',['SBH']),row('trg','04-26','Hari Keputeraan Sultan Terengganu','Sultan of Terengganu’s Birthday',['TRG']),row('pls','05-17','Hari Keputeraan Raja Perlis','Raja of Perlis’s Birthday',['PLS']),row('phg-hol','05-22','Hari Hol Sultan Ahmad Shah','Hari Hol of Sultan Ahmad Shah',['PHG']),row('kaamatan1','05-30','Pesta Kaamatan','Harvest Festival',['SBH','LBN']),row('kaamatan2','05-31','Pesta Kaamatan (Hari Kedua)','Harvest Festival (Day 2)',['SBH','LBN']),row('gawai1','06-01','Hari Gawai Dayak','Gawai Dayak',['SWK']),row('gawai2','06-02','Hari Gawai Dayak (Hari Kedua)','Gawai Dayak (Day 2)',['SWK']),row('heritage','07-07','Hari Warisan Dunia George Town','George Town World Heritage Day',['PNG']),row('sarawak','07-22','Hari Sarawak','Sarawak Day',['SWK']),row('phg','07-31','Hari Keputeraan Sultan Pahang','Sultan of Pahang’s Birthday',['PHG']),row('mlk','08-24','Hari Jadi Yang di-Pertua Negeri Melaka','Melaka Governor’s Birthday',['MLK']),row('ktn1','09-29','Hari Keputeraan Sultan Kelantan','Sultan of Kelantan’s Birthday',['KTN']),row('ktn2','09-30','Hari Keputeraan Sultan Kelantan (Hari Kedua)','Sultan of Kelantan’s Birthday (Day 2)',['KTN']),row('sgr','12-11','Hari Keputeraan Sultan Selangor','Sultan of Selangor’s Birthday',['SGR']),row('eve','12-24','Malam Krismas','Christmas Eve',['SBH']),
row('teachers','05-16','Hari Guru','Teachers’ Day',['ALL'],'event'),row('women','03-08','Hari Wanita Antarabangsa','International Women’s Day',['ALL'],'event'),row('environment','06-05','Hari Alam Sekitar Sedunia','World Environment Day',['ALL'],'event')];
export const movable=[
{id:'agong',month:6,weekday:1,n:1,nameMs:'Hari Keputeraan YDPA',nameEn:'Yang di-Pertuan Agong’s Birthday',states:['ALL']},
{id:'kdh',month:6,weekday:0,n:3,nameMs:'Hari Keputeraan Sultan Kedah',nameEn:'Sultan of Kedah’s Birthday',states:['KDH']},
{id:'png',month:7,weekday:6,n:2,nameMs:'Hari Jadi Yang di-Pertua Negeri Pulau Pinang',nameEn:'Penang Governor’s Birthday',states:['PNG']},
{id:'swk',month:10,weekday:6,n:2,nameMs:'Hari Jadi Yang di-Pertua Negeri Sarawak',nameEn:'Sarawak Governor’s Birthday',states:['SWK']},
{id:'prk',month:11,weekday:5,n:1,nameMs:'Hari Keputeraan Sultan Perak',nameEn:'Sultan of Perak’s Birthday',states:['PRK']}];
export const islamic=[
{id:'israk',month:7,day:27,nameMs:'Israk dan Mikraj',nameEn:'Isra and Mi’raj',states:['KDH','NSN','PLS','TRG']},
{id:'ramadan',month:9,day:1,nameMs:'Awal Ramadan',nameEn:'First Day of Ramadan',states:['JHR','KDH']},
{id:'nuzul',month:9,day:17,nameMs:'Nuzul al-Quran',nameEn:'Nuzul al-Quran',states:except('JHR','KDH','MLK','NSN','SBH','SWK')},
{id:'fitri1',month:10,day:1,nameMs:'Hari Raya Aidilfitri',nameEn:'Eid al-Fitr',states:['ALL']},
{id:'fitri2',month:10,day:2,nameMs:'Hari Raya Aidilfitri (Hari Kedua)',nameEn:'Eid al-Fitr (Day 2)',states:['ALL']},
{id:'arafah',month:12,day:9,nameMs:'Hari Arafah',nameEn:'Arafat Day',states:['KTN','TRG']},
{id:'adha1',month:12,day:10,nameMs:'Hari Raya Aidiladha',nameEn:'Eid al-Adha',states:['ALL']},
{id:'adha2',month:12,day:11,nameMs:'Hari Raya Aidiladha (Hari Kedua)',nameEn:'Eid al-Adha (Day 2)',states:['KDH','KTN','PLS','TRG']},
{id:'muharram',month:1,day:1,nameMs:'Awal Muharram',nameEn:'Islamic New Year',states:['ALL']},
{id:'maulid',month:3,day:12,nameMs:'Maulidur Rasul',nameEn:'Prophet Muhammad’s Birthday',states:['ALL']},
{id:'jhr-hol',month:2,day:6,nameMs:'Hari Hol Sultan Iskandar',nameEn:'Hari Hol of Sultan Iskandar',states:['JHR']}];
const special=[row('cny1','02-17','Tahun Baru Cina','Chinese New Year'),row('cny2','02-18','Tahun Baru Cina (Hari Kedua)','Chinese New Year (Day 2)'),row('wesak','05-31','Hari Wesak','Wesak Day'),row('deepavali','11-08','Deepavali','Deepavali',except('SWK')),row('thaipusam','02-01','Thaipusam','Thaipusam',['JHR','NSN','PRK','PNG','SGR','KUL','PJY']),row('goodfriday','04-03','Good Friday','Good Friday',['SBH','SWK']),row('fitri3','03-23','Hari Raya Aidilfitri (Hari Ketiga)','Eid al-Fitr (Day 3)',['MLK'])];
const dates2026={israk:'01-17',ramadan:'02-19',nuzul:'03-07',fitri1:'03-21',fitri2:'03-22',arafah:'05-26',adha1:'05-27',adha2:'05-28',muharram:'06-17',maulid:'08-25','jhr-hol':'07-21'};
// Base 2026 gazette schedule, not a claim to include later special proclamations.
export const calendarOverrides={2026:{publicHolidays:[...recurring.filter(x=>x.category==='public'),...special,...islamic.map(x=>({...x,md:dates2026[x.id]})),...movable.map(x=>({...x,md:({agong:'06-01',kdh:'06-21',png:'07-11',swk:'10-10',prk:'11-06'})[x.id]}))].map(x=>({...x,date:'2026-'+x.md,category:'public',official:true,source:sources.public})),schoolHolidays:[
...['03-20/03-28','05-22/06-06','08-28/09-05','12-04/12-31'].map(r=>({range:r,group:'A',states:groupA})),
...['03-21/03-29','05-23/06-07','08-29/09-06','12-05/12-31'].map(r=>({range:r,group:'B',states:groupB})),
...['02-15/02-16','02-19/02-19','03-19/03-19','11-09/11-09'].map(r=>({range:r,group:'A',states:groupA})),
...['02-16/02-16','02-19/02-20','03-19/03-20'].map(r=>({range:r,group:'B',states:groupB})),
{range:'11-10/11-10',group:'B',states:groupB.filter(x=>x!=='SWK')},{range:'11-09/11-09',group:'B',states:['SWK']}
].map((x,i)=>({...x,id:'school'+i,start:'2026-'+x.range.split('/')[0],end:'2026-'+x.range.split('/')[1],nameMs:'Cuti Sekolah · '+x.group,nameEn:'School Holiday · '+x.group,category:'school',official:true,source:sources.school})),specialEvents:[],replacementHolidays:[]}};
// Add documented replacements here with date, states, replacesId, official and source.
// No blanket weekend replacement is applied across Malaysia.
for (const [group,end,groupStates] of [['A','2026-01-10',groupA],['B','2026-01-11',groupB]]) calendarOverrides[2026].schoolHolidays.push({id:'school-carry-'+group,start:'2026-01-01',end,group,states:groupStates,nameMs:'Cuti Sekolah · '+group,nameEn:'School Holiday · '+group,category:'school',official:true,source:'https://www.moe.gov.my/storage/files/shares/Takwim/Takwim%20Persekolahan/Kalendar%20Akademik%202025_2026%20(Pindaan).pdf'});
// Entries whose official schedule is conditional are never used as quiz facts.
for(const r of calendarOverrides[2026].publicHolidays)if(islamic.some(x=>x.id===r.id)||r.id==='deepavali')r.subjectToChange=true;
// BKPP announcement: Wesak Sunday 31 May + Agong Monday 1 June => 2 June.
// Listed here only for Sunday-weekend jurisdictions covered by Act 369.
calendarOverrides[2026].replacementHolidays.push({id:'wesak-replacement-2026',date:'2026-06-02',nameMs:'Cuti Ganti Hari Wesak',nameEn:'Wesak Replacement Holiday',states:['JHR','MLK','NSN','PHG','PRK','PLS','PNG','SGR','KUL','PJY','LBN'],category:'public',official:true,source:'https://www.kabinet.gov.my/'});
