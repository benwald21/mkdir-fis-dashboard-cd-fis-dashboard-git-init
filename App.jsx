import React, { useState, useEffect, useRef, useCallback } from "react";

/* ============================================================
   PITT BRANDING + GLOBAL STYLES
   ============================================================ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600;700;800&family=Barlow+Condensed:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --gold: #FFB81C;
      --gold2: #E09900;
      --gold-dim: rgba(255,184,28,0.15);
      --gold-glow: rgba(255,184,28,0.25);
      --navy: #003594;
      --navy2: #002878;
      --navy3: #001D5A;
      --royal: #003594;
      --royal2: #0045C4;
      --bg: #05090F;
      --s1: #080D18;
      --s2: #0C1220;
      --s3: #101828;
      --s4: #152035;
      --s5: #1A2840;
      --bd: rgba(255,255,255,0.06);
      --bd2: rgba(255,255,255,0.11);
      --bdg: rgba(255,184,28,0.2);
      --t1: #EEF2FA;
      --t2: #8B97B8;
      --t3: #4E5E80;
      --r: #FF4444;
      --g: #22C55E;
      --b: #3D8EFF;
      --o: #FF8C42;
      --purple: #A855F7;
      --ff-h: 'Bebas Neue', sans-serif;
      --ff-c: 'Barlow Condensed', sans-serif;
      --ff-b: 'Barlow', sans-serif;
      --ff-m: 'JetBrains Mono', monospace;
    }
    html,body,#root { height:100%; background:var(--bg); color:var(--t1); font-family:var(--ff-b); overflow:hidden; }
    ::-webkit-scrollbar { width:4px; height:4px; }
    ::-webkit-scrollbar-track { background:transparent; }
    ::-webkit-scrollbar-thumb { background:var(--s5); border-radius:3px; }
    button { cursor:pointer; border:none; background:none; font-family:var(--ff-b); color:inherit; }
    input,textarea,select { font-family:var(--ff-b); }

    .fade-in { animation: fadeIn .22s ease forwards; }
    @keyframes fadeIn { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
    .slide-in { animation: slideIn .2s ease forwards; }
    @keyframes slideIn { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
    .pulse { animation: pulse 2s ease-in-out infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.45} }
    .shimmer { animation: shimmer 1.6s infinite; background:linear-gradient(90deg,var(--s3) 25%,var(--s4) 50%,var(--s3) 75%); background-size:200% 100%; }
    @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

    .gold-text { color: var(--gold); }
    .gold-grad { background:linear-gradient(135deg,var(--gold),#FDD97B); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
    .navy-grad { background:linear-gradient(135deg,#3D8EFF,var(--gold)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

    .tag { display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;font-family:var(--ff-c); }
    .tg { background:rgba(34,197,94,.15);color:#22C55E; }
    .tr { background:rgba(255,68,68,.15);color:#FF4444; }
    .ty { background:rgba(255,184,28,.15);color:var(--gold); }
    .tb { background:rgba(61,142,255,.15);color:#3D8EFF; }
    .to { background:rgba(255,140,66,.15);color:#FF8C42; }
    .tp { background:rgba(168,85,247,.15);color:#A855F7; }
    .td { background:var(--s4);color:var(--t3); }

    .card { background:var(--s2);border:1px solid var(--bd);border-radius:12px;padding:20px; }
    .card-sm { background:var(--s2);border:1px solid var(--bd);border-radius:10px;padding:14px; }
    .card-gold { background:var(--s2);border:1px solid var(--bdg);border-radius:12px;padding:20px; }

    .btn-gold { background:var(--gold);color:#000;font-weight:700;padding:8px 18px;border-radius:8px;font-size:13px;letter-spacing:.3px;transition:all .2s;display:inline-flex;align-items:center;gap:6px; }
    .btn-gold:hover { background:#FDD97B;transform:translateY(-1px);box-shadow:0 4px 20px rgba(255,184,28,.35); }
    .btn-navy { background:var(--navy);color:#fff;font-weight:600;padding:8px 16px;border-radius:8px;font-size:13px;border:1px solid rgba(61,142,255,.3);transition:all .2s;display:inline-flex;align-items:center;gap:6px; }
    .btn-navy:hover { background:var(--navy2);transform:translateY(-1px); }
    .btn-ghost { background:var(--s3);color:var(--t2);font-weight:600;padding:8px 16px;border-radius:8px;font-size:13px;border:1px solid var(--bd2);transition:all .2s;display:inline-flex;align-items:center;gap:6px; }
    .btn-ghost:hover { background:var(--s4);color:var(--t1); }

    .dt { width:100%;border-collapse:collapse; }
    .dt th { color:var(--t3);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;padding:9px 14px;border-bottom:1px solid var(--bd);text-align:left;font-family:var(--ff-c); }
    .dt td { padding:11px 14px;border-bottom:1px solid rgba(255,255,255,.03);font-size:13px;color:var(--t2); }
    .dt tr:last-child td { border-bottom:none; }
    .dt tr:hover td { background:rgba(255,184,28,.02); }
    .dt td.hl { color:var(--t1);font-weight:600; }

    .kpi { background:var(--s2);border:1px solid var(--bd);border-radius:12px;padding:20px 22px;transition:border-color .2s;position:relative;overflow:hidden; }
    .kpi:hover { border-color:var(--bdg); }
    .kpi-ghost { position:absolute;right:-10px;bottom:-14px;opacity:.04;pointer-events:none; }
    .kpi-lbl { font-size:11px;color:var(--t3);text-transform:uppercase;letter-spacing:.8px;font-weight:700;font-family:var(--ff-c);margin-bottom:8px; }
    .kpi-val { font-family:var(--ff-h);font-size:38px;letter-spacing:1px;line-height:1; }
    .kpi-sub { font-size:11px;color:var(--t3);margin-top:5px;text-transform:uppercase;letter-spacing:.5px;font-family:var(--ff-c); }

    .pbar { height:5px;background:var(--s4);border-radius:3px;overflow:hidden; }
    .pfill { height:100%;border-radius:3px;transition:width .7s cubic-bezier(.4,0,.2,1); }

    .section-h { font-family:var(--ff-h);font-size:30px;letter-spacing:1.5px;color:var(--t1);line-height:1; }
    .section-sub { font-size:12px;color:var(--t3);margin-top:4px;font-family:var(--ff-c);letter-spacing:.3px; }

    /* Login screen */
    .login-bg { background: radial-gradient(ellipse at 25% 50%, rgba(0,53,148,.5) 0%, transparent 55%), radial-gradient(ellipse at 75% 25%, rgba(255,184,28,.14) 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(0,69,196,.2) 0%, transparent 50%), var(--bg); }
  `}</style>
);

/* ============================================================
   ROLE-BASED ACCESS CONTROL
   ============================================================ */
const ROLES = {
  head_coach: {
    label: "Head Coach",
    color: "var(--gold)",
    badge: "HC",
    modules: "*",
  },
  technical_director: {
    label: "Technical Director",
    color: "var(--gold)",
    badge: "TD",
    modules: "*",
  },
  assistant_coach: {
    label: "Assistant Coach",
    color: "var(--b)",
    badge: "AC",
    modules: ["dashboard","roster","recruiting","depthchart","schedule","transfer","scouting","development","nil"],
  },
  assistant_coach_2: {
    label: "Assistant Coach",
    color: "var(--b)",
    badge: "AC",
    modules: ["dashboard","roster","depthchart","schedule","scouting","development"],
  },
  athletic_trainer: {
    label: "Athletic Trainer",
    color: "var(--r)",
    badge: "AT",
    modules: ["medical","sportsscience"],
  },
  sport_scientist: {
    label: "Sport Scientist / S&C",
    color: "#22C55E",
    badge: "SS",
    modules: ["sportsscience","medical","development"],
  },
  academic_advisor: {
    label: "Academic Advisor",
    color: "#A855F7",
    badge: "AA",
    modules: ["academics","roster"],
  },
  sports_info: {
    label: "Sports Information",
    color: "var(--royal2)",
    badge: "SI",
    modules: ["dashboard","roster","schedule","scouting","development","sportsinfo"],
  },
  marketing: {
    label: "Marketing / Ticketing",
    color: "var(--o)",
    badge: "MK",
    modules: ["dashboard","camps","alumni","schedule","marketing"],
  },
  admin: {
    label: "Operations / Admin",
    color: "var(--t2)",
    badge: "OP",
    modules: ["dashboard","schedule","staff","camps","scholarship","programbudget"],
  },
};

const STAFF_ACCOUNTS = [
  { id:1, name:"Coach Taylor Morrison", role:"head_coach", initials:"TM", pin:"1234" },
  { id:2, name:"Alex Chen", role:"technical_director", initials:"AC", pin:"2345" },
  { id:3, name:"Jordan Blake", role:"assistant_coach", initials:"JB", pin:"3456", desc:"Recruiting Coord." },
  { id:4, name:"Riley Thompson", role:"assistant_coach_2", initials:"RT", pin:"3457", desc:"Tactical / Defense" },
  { id:5, name:"Dr. Sam Rivera", role:"athletic_trainer", initials:"SR", pin:"4567" },
  { id:6, name:"Dr. Casey Park", role:"sport_scientist", initials:"CP", pin:"5678" },
  { id:7, name:"Prof. Dana Wells", role:"academic_advisor", initials:"DW", pin:"6789" },
  { id:8, name:"Marcus Hill", role:"sports_info", initials:"MH", pin:"7891" },
  { id:9, name:"Ava Russo", role:"marketing", initials:"AR", pin:"7892" },
  { id:10, name:"Morgan Ellis", role:"admin", initials:"ME", pin:"7890" },
];

const canAccess = (role, moduleId) => {
  if (!role) return false;
  const r = ROLES[role];
  if (!r) return false;
  if (r.modules === "*") return true;
  return r.modules.includes(moduleId);
};

/* ============================================================
   DATA — Pitt Women's Soccer
   ============================================================ */
const PROGRAM = {
  name: "Pitt Women's Soccer",
  school: "University of Pittsburgh",
  conf: "Atlantic Coast Conference",
  div: "NCAA Division I",
  season: "2024–25",
  mantra: "Forged in Steel",
};

const ROSTER = [
  {id:1,name:"Sofia Marchetti",pos:"GK",yr:"Sr",gpa:3.7,eq:1.0,aid:56000,status:"Active",jersey:1,goals:0,assists:0,apps:22,injury:null,elig:"Y4-Last",major:"Exercise Science"},
  {id:2,name:"Layla Hassan",pos:"CB",yr:"Jr",gpa:3.9,eq:1.0,aid:56000,status:"Active",jersey:4,goals:2,assists:1,apps:21,injury:null,elig:"Y3",major:"Pre-Med"},
  {id:3,name:"Amara Diallo",pos:"CB",yr:"So",gpa:2.7,eq:0.75,aid:42000,status:"At-Risk",jersey:5,goals:1,assists:0,apps:18,injury:"Ankle - Returns Jan 12",elig:"Y2",major:"Communications"},
  {id:4,name:"Brianna Torres",pos:"LB",yr:"Sr",gpa:3.8,eq:1.0,aid:56000,status:"Active",jersey:3,goals:3,assists:7,apps:22,injury:null,elig:"Y4-Last",major:"Business"},
  {id:5,name:"Kayla Nguyen",pos:"RB",yr:"Fr",gpa:3.3,eq:0.5,aid:28000,status:"Active",jersey:2,goals:1,assists:4,apps:17,injury:null,elig:"Y1",major:"Psychology"},
  {id:6,name:"Destiny Okafor",pos:"CDM",yr:"Jr",gpa:3.5,eq:1.0,aid:56000,status:"Active",jersey:6,goals:5,assists:9,apps:22,injury:null,elig:"Y3",major:"Kinesiology"},
  {id:7,name:"Priya Patel",pos:"CM",yr:"So",gpa:2.5,eq:0.75,aid:42000,status:"At-Risk",jersey:8,goals:4,assists:3,apps:19,injury:null,elig:"Y2",major:"Undecided"},
  {id:8,name:"Celine Ottah",pos:"CM",yr:"Jr",gpa:3.2,eq:1.0,aid:56000,status:"Active",jersey:10,goals:8,assists:12,apps:22,injury:null,elig:"Y3",major:"Marketing"},
  {id:9,name:"Eden Jones",pos:"LW",yr:"Sr",gpa:3.6,eq:1.0,aid:56000,status:"Active",jersey:11,goals:14,assists:6,apps:22,injury:null,elig:"Y4-Last",major:"Sports Mgmt"},
  {id:10,name:"Adi Bianchin",pos:"RW",yr:"Fr",gpa:3.4,eq:0.25,aid:14000,status:"Active",jersey:7,goals:7,assists:8,apps:20,injury:null,elig:"Y1",major:"Health Sciences"},
  {id:11,name:"Talyn Guthrie",pos:"ST",yr:"Jr",gpa:3.0,eq:0.87,aid:48720,status:"Active",jersey:9,goals:19,assists:4,apps:22,injury:null,elig:"Y3",major:"Communications"},
  {id:12,name:"Yina Addo",pos:"GK",yr:"So",gpa:3.6,eq:0.95,aid:53200,status:"Active",jersey:12,goals:0,assists:0,apps:7,injury:null,elig:"Y2",major:"Biology"},
  {id:13,name:"Claire Jones",pos:"CB",yr:"Fr",gpa:3.9,eq:0.5,aid:28000,status:"Active",jersey:14,goals:0,assists:1,apps:13,injury:null,elig:"Y1",major:"Engineering"},
  {id:14,name:"Olivia Lee",pos:"CM",yr:"So",gpa:2.4,eq:0.45,aid:25200,status:"At-Risk",jersey:16,goals:2,assists:2,apps:15,injury:"Hamstring - Day-to-day",elig:"Y2",major:"General Studies"},
  {id:15,name:"Maci Tew",pos:"LW",yr:"Sr",gpa:3.3,eq:0.87,aid:48720,status:"Active",jersey:17,goals:10,assists:7,apps:21,injury:null,elig:"Y4-Last",major:"Nursing"},
  {id:16,name:"Laila Vloet",pos:"RB",yr:"Jr",gpa:3.4,eq:0.87,aid:48720,status:"Active",jersey:22,goals:3,assists:10,apps:20,injury:null,elig:"Y3",major:"Finance"},
  {id:17,name:"Mya Archibald",pos:"CDM",yr:"Fr",gpa:3.7,eq:0.41,aid:22960,status:"Active",jersey:18,goals:1,assists:3,apps:11,injury:null,elig:"Y1",major:"Pre-Law"},
  {id:18,name:"Mariama Dabo",pos:"ST",yr:"So",gpa:2.9,eq:0.41,aid:22960,status:"Active",jersey:20,goals:4,assists:2,apps:13,injury:null,elig:"Y2",major:"Social Work"},
  {id:19,name:"Hannah Minogue",pos:"LB",yr:"Fr",gpa:3.5,eq:0.17,aid:9520,status:"Active",jersey:23,goals:0,assists:1,apps:8,injury:null,elig:"Y1",major:"Undecided"},
  {id:20,name:"Savannah Johnson",pos:"GK",yr:"Fr",gpa:3.1,eq:0.2,aid:11200,status:"Active",jersey:25,goals:0,assists:0,apps:3,injury:null,elig:"Y1",major:"Business"},
  {id:21,name:"Maya Bright",pos:"RW",yr:"So",gpa:3.2,eq:0.0,aid:0,status:"Active",jersey:27,goals:2,assists:3,apps:9,injury:null,elig:"Y2",major:"Psychology"},
  {id:22,name:"Sophie Rourke",pos:"CB",yr:"Jr",gpa:3.6,eq:0.0,aid:0,status:"Active",jersey:28,goals:0,assists:0,apps:5,injury:null,elig:"Y3",major:"Chemistry"},
  {id:23,name:"Elle Rowlands",pos:"CM",yr:"Fr",gpa:2.8,eq:0.0,aid:0,status:"At-Risk",jersey:30,goals:1,assists:1,apps:7,injury:null,elig:"Y1",major:"Undecided"},
  {id:24,name:"Addison Roemer",pos:"ST",yr:"So",gpa:3.0,eq:0.0,aid:0,status:"Active",jersey:32,goals:3,assists:1,apps:10,injury:null,elig:"Y2",major:"Business"},
  {id:25,name:"Sage Stelzer",pos:"LW",yr:"Fr",gpa:3.8,eq:0.0,aid:0,status:"Active",jersey:33,goals:0,assists:2,apps:6,injury:null,elig:"Y1",major:"Health Sciences"},
];

const RECRUITS = [
  {id:1,name:"Mattie Caldwell",pos:"ST",gradYr:2025,gpa:3.7,rating:4.9,state:"TX",status:"Verbal Commit",contacts:"6 calls, campus visit",offer:"Full",club:"Texas Rush",notes:"COMMITTED. Signing day Feb 5. Top priority to retain.",priority:"High"},
  {id:2,name:"Jess Kowalski",pos:"CM",gradYr:2025,gpa:3.5,rating:4.6,state:"OH",status:"Offer Extended",contacts:"4 calls, 2 emails",offer:"87%",club:"Ohio Elite",notes:"Deciding between Pitt and Duke. Visit scheduled Jan 20.",priority:"High"},
  {id:3,name:"Nadia Osei",pos:"CB",gradYr:2025,gpa:3.9,rating:4.7,state:"VA",status:"Visit Scheduled",contacts:"5 calls, campus visit",offer:"Full",club:"Richmond Strikers",notes:"Top defender target. Coach Morrison top priority.",priority:"High"},
  {id:4,name:"Keely Park",pos:"GK",gradYr:2025,gpa:3.8,rating:4.5,state:"CA",status:"Offer Extended",contacts:"3 calls, 1 campus visit",offer:"Full",club:"LA Premier",notes:"Best GK in class. Needs roommate/social fit sold.",priority:"High"},
  {id:5,name:"Brooke Hensley",pos:"LW",gradYr:2026,gpa:3.2,rating:4.4,state:"FL",status:"Scouting",contacts:"Film only",offer:"TBD",club:"FC Florida",notes:"2026 watch. Exceptional crossing ability.",priority:"Low"},
  {id:6,name:"Amelia Forte",pos:"LB",gradYr:2025,gpa:3.6,rating:4.3,state:"PA",status:"Offer Extended",contacts:"3 calls, 2 visits",offer:"75%",club:"FC Penn",notes:"Local talent. Family strong interest in Pitt.",priority:"Med"},
  {id:7,name:"Destiny Cruz",pos:"CM",gradYr:2025,gpa:2.8,rating:4.2,state:"NC",status:"Soft Offer",contacts:"2 calls",offer:"50%",club:"Carolina Dynamo",notes:"GPA concern. Monitor spring semester.",priority:"Med"},
];

const STAFF_LIST = [
  {id:1,name:"Coach Taylor Morrison",role:"Head Coach",salary:195000,tasks:[{text:"Submit spring training schedule to ACC compliance",due:"Jan 15",done:false,pri:"High"},{text:"Meet with AD re: budget FY25",due:"Jan 18",done:true,pri:"High"},{text:"Review Talyn Guthrie NIL deal",due:"Jan 12",done:false,pri:"Med"}]},
  {id:2,name:"Alex Chen",role:"Technical Director",salary:88000,tasks:[{text:"Update 4-3-3 pressing triggers document",due:"Jan 14",done:false,pri:"High"},{text:"Film analysis – Duke tendencies",due:"Jan 16",done:true,pri:"High"},{text:"Pre-season readiness assessment",due:"Jan 20",done:false,pri:"High"}]},
  {id:3,name:"Jordan Blake",role:"Asst. Coach / Recruiting",salary:72000,tasks:[{text:"Call Jess Kowalski family re: visit",due:"Jan 12",done:false,pri:"High"},{text:"Update 2026 prospect watch list",due:"Jan 16",done:true,pri:"Med"},{text:"Submit recruiting travel requests",due:"Jan 14",done:false,pri:"High"}]},
  {id:4,name:"Dr. Sam Rivera",role:"Athletic Trainer",salary:65000,tasks:[{text:"Amara Diallo return-to-play protocol",due:"Jan 14",done:false,pri:"High"},{text:"Submit insurance billing – Dec matches",due:"Jan 18",done:false,pri:"Med"},{text:"Pre-season medical clearances",due:"Jan 20",done:true,pri:"High"}]},
  {id:5,name:"Dr. Casey Park",role:"Sport Scientist",salary:68000,tasks:[{text:"Player load monitoring report – preseason",due:"Jan 14",done:false,pri:"High"},{text:"Catapult vest inventory check",due:"Jan 16",done:true,pri:"Med"},{text:"Nutrition compliance audit",due:"Jan 18",done:false,pri:"Med"}]},
  {id:6,name:"Prof. Dana Wells",role:"Academic Advisor",salary:52000,tasks:[{text:"Spring eligibility certifications",due:"Jan 15",done:false,pri:"High"},{text:"Meet with Priya Patel & Olivia Lee re: grades",due:"Jan 13",done:false,pri:"High"},{text:"Study hall schedule – posted",due:"Jan 12",done:true,pri:"Med"}]},
  {id:7,name:"Morgan Ellis",role:"Operations",salary:50000,tasks:[{text:"Book travel – Jan 25 away at Syracuse",due:"Jan 13",done:false,pri:"High"},{text:"Uniform kit audit",due:"Jan 16",done:true,pri:"Low"},{text:"Catapult vest firmware update",due:"Jan 14",done:false,pri:"Med"}]},
];

const SCHEDULE = [
  {id:1,date:"Sep 1",opp:"Duquesne",home:true,result:"W",gf:4,ga:0,conf:false},
  {id:2,date:"Sep 5",opp:"Penn State",home:false,result:"L",gf:1,ga:2,conf:false},
  {id:3,date:"Sep 8",opp:"West Virginia",home:true,result:"W",gf:3,ga:1,conf:false},
  {id:4,date:"Sep 12",opp:"Louisville",home:false,result:"W",gf:2,ga:0,conf:true},
  {id:5,date:"Sep 19",opp:"Virginia Tech",home:true,result:"D",gf:1,ga:1,conf:true},
  {id:6,date:"Sep 26",opp:"Syracuse",home:false,result:"W",gf:2,ga:1,conf:true},
  {id:7,date:"Oct 3",opp:"Notre Dame",home:true,result:"L",gf:0,ga:1,conf:true},
  {id:8,date:"Oct 10",opp:"NC State",home:false,result:"W",gf:3,ga:0,conf:true},
  {id:9,date:"Oct 17",opp:"Duke",home:true,result:"W",gf:1,ga:0,conf:true},
  {id:10,date:"Oct 24",opp:"Wake Forest",home:false,result:"L",gf:1,ga:2,conf:true},
  {id:11,date:"Oct 31",opp:"Virginia",home:true,result:"W",gf:2,ga:1,conf:true},
  {id:12,date:"Nov 7",opp:"Clemson",home:false,result:"W",gf:3,ga:2,conf:true},
  {id:13,date:"Nov 14",opp:"NC State",home:true,result:"D",gf:2,ga:2,conf:true},
  {id:14,date:"Nov 21",opp:"Louisville",home:true,result:"W",gf:1,ga:0,conf:true},
  {id:15,date:"Nov 28",opp:"Notre Dame",home:false,result:"L",gf:0,ga:1,conf:true},
  {id:16,date:"Dec 5",opp:"ACC QF",home:false,result:"W",gf:2,ga:1,conf:true},
  {id:17,date:"Dec 12",opp:"ACC Semifinal",home:false,result:"W",gf:1,ga:0,conf:true},
  {id:18,date:"Jan 25",opp:"Syracuse",home:false,result:null,gf:null,ga:null,conf:true},
  {id:19,date:"Feb 1",opp:"Virginia Tech",home:true,result:null,gf:null,ga:null,conf:true},
  {id:20,date:"Feb 8",opp:"Duke",home:false,result:null,gf:null,ga:null,conf:true},
  {id:21,date:"Feb 15",opp:"Notre Dame",home:true,result:null,gf:null,ga:null,conf:true},
  {id:22,date:"Feb 22",opp:"Virginia",home:false,result:null,gf:null,ga:null,conf:true},
];

const TRANSFER_PORTAL = [
  {id:1,name:"Camille Bernard",pos:"ST",prev:"Syracuse",gpa:3.2,rating:4.6,status:"Visit Scheduled",eligYrs:"2 remaining",notes:"Physical striker, fills scoring depth behind Guthrie",offer:"Full"},
  {id:2,name:"Rosa Esteban",pos:"CDM",prev:"Virginia Tech",gpa:3.5,rating:4.5,status:"Contacted",eligYrs:"1 remaining",notes:"High press CDM – exactly our profile. Departed after coaching change.",offer:"Full"},
  {id:3,name:"Wei Zhang",pos:"CB",prev:"Notre Dame",gpa:3.1,rating:4.3,status:"Monitoring",eligYrs:"2 remaining",notes:"Left-footed CB. Physical, strong in air. Culture fit TBD.",offer:"75%"},
  {id:4,name:"Tia Brown",pos:"LW",prev:"Louisville",gpa:2.6,rating:4.0,status:"Passed",eligYrs:"1 remaining",notes:"GPA below 2.7 threshold. Did not pursue.",offer:"—"},
];

const NIL_DEALS = [
  {id:1,player:"Talyn Guthrie",brand:"Adidas Pittsburgh",value:11500,type:"Endorsement",status:"Active",expires:"Aug 2025",compliant:true},
  {id:2,player:"Eden Jones",brand:"Dick's Sporting Goods",value:6800,type:"Appearance",status:"Active",expires:"May 2025",compliant:true},
  {id:3,player:"Celine Ottah",brand:"UPMC Sports Med",value:9200,type:"Social Media",status:"Pending Review",expires:"Jul 2025",compliant:null},
  {id:4,player:"Yina Addo",brand:"Nike Campus Store",value:4200,type:"Endorsement",status:"Active",expires:"Jun 2025",compliant:true},
  {id:5,player:"Brianna Torres",brand:"Local Auto Dealer",value:3000,type:"Appearance",status:"Expired",expires:"Nov 2024",compliant:true},
];

const INJURIES = [
  {id:1,player:"Amara Diallo",pos:"CB",type:"Ankle Sprain (Grade 2)",sev:"Moderate",injured:"Dec 5",returnEst:"Jan 12",status:"Rehabbing",missed:3,protocol:"Phase 3 – Agility"},
  {id:2,player:"Olivia Lee",pos:"CM",type:"Hamstring Strain",sev:"Mild",injured:"Jan 8",returnEst:"Jan 15",status:"Day-to-Day",missed:1,protocol:"Phase 2 – Running"},
  {id:3,player:"Priya Patel",pos:"CM",type:"Concussion Protocol",sev:"Cleared",injured:"Nov 14",returnEst:"Nov 28",status:"Cleared",missed:1,protocol:"Full Clearance"},
];

const PLAYER_LOAD = [
  {name:"Talyn Guthrie",pos:"ST",pl:1124,plMin:10.2,hsd:312,dist:10840,maxVel:16.1,load:"High",risk:"Low"},
  {name:"Celine Ottah",pos:"CM",pl:1084,plMin:11.05,hsd:127,dist:9835,maxVel:15.37,load:"Very High",risk:"Med"},
  {name:"Eden Jones",pos:"LW",pl:981,plMin:10.04,hsd:247,dist:11214,maxVel:15.18,load:"High",risk:"Low"},
  {name:"Adi Bianchin",pos:"RW",pl:895,plMin:9.09,hsd:216,dist:8328,maxVel:14.24,load:"Optimal",risk:"Low"},
  {name:"Destiny Okafor",pos:"CDM",pl:1201,plMin:10.89,hsd:241,dist:11650,maxVel:14.52,load:"Very High",risk:"Med"},
  {name:"Brianna Torres",pos:"LB",pl:895,plMin:8.13,hsd:198,dist:9800,maxVel:14.91,load:"Optimal",risk:"Low"},
  {name:"Layla Hassan",pos:"CB",pl:743,plMin:7.14,hsd:157,dist:9100,maxVel:13.82,load:"Moderate",risk:"Low"},
  {name:"Maci Tew",pos:"LW",pl:974,plMin:9.89,hsd:219,dist:9755,maxVel:15.4,load:"High",risk:"Low"},
  {name:"Elle Rowlands",pos:"CM",pl:936,plMin:9.58,hsd:200,dist:9066,maxVel:15.3,load:"High",risk:"Low"},
];

const DONORS = [
  {id:1,name:"Pittsburgh Panthers Foundation",level:"Platinum",total:180000,lastGift:"Dec 2024",amt:40000,focus:"Scholarships",nextContact:"Feb 1"},
  {id:2,name:"Robert Greenfield",level:"Platinum",total:125000,lastGift:"Nov 2024",amt:30000,focus:"Facilities",nextContact:"Jan 20"},
  {id:3,name:"Pitt Athletic Association",level:"Gold",total:95000,lastGift:"Oct 2024",amt:20000,focus:"Equipment",nextContact:"Feb 15"},
  {id:4,name:"Maria Santos (Alumna '08)",level:"Silver",total:28000,lastGift:"Sep 2024",amt:5000,focus:"General Fund",nextContact:"Jan 28"},
  {id:5,name:"Tech Innovators LLC",level:"Gold",total:62000,lastGift:"Aug 2024",amt:18000,focus:"Sports Science",nextContact:"Mar 1"},
];

const SCOUTING_NOTES = [
  {id:1,player:"Mattie Caldwell",scout:"Jordan Blake",date:"Dec 1",event:"TX State Cup Final",rating:4.9,notes:"Elite finishing under pressure. Left foot clinical. 3G 1A in final. Must sign.",hasVideo:true},
  {id:2,player:"Nadia Osei",scout:"Alex Chen",date:"Nov 20",event:"VA Regional Select",rating:4.7,notes:"Elite CB composure. Great range of passing. High character confirmed by club staff.",hasVideo:true},
  {id:3,player:"Brooke Hensley",scout:"Jordan Blake",date:"Dec 8",event:"FL Sunshine Cup",rating:4.4,notes:"Raw technical quality. Needs tactical shape. 2026 target.",hasVideo:false},
  {id:4,player:"Camille Bernard (Portal)",scout:"Taylor Morrison",date:"Jan 5",event:"Film Review",rating:4.6,notes:"Watched full Syracuse season. Physical but technical finisher. Arrange visit.",hasVideo:true},
];

const BUDGET = {
  cap: 14.0, // women's soccer DI
  used: ROSTER.reduce((a,p)=>a+p.eq,0),
  totalAid: ROSTER.reduce((a,p)=>a+p.aid,0),
  revenue: [
    {src:"University Allocation",amt:2100000},
    {src:"Donor / Booster Gifts",amt:313000},
    {src:"Camp Revenue",amt:80275},
    {src:"Merchandise",amt:22000},
    {src:"Nike Partnership",amt:45000},
  ],
  expenses: [
    {cat:"Scholarship Aid",amt:904213,budget:940000},
    {cat:"Staff Salaries",amt:590000,budget:590000},
    {cat:"Travel & Lodging",amt:210000,budget:225000},
    {cat:"Equipment & Kits",amt:78000,budget:85000},
    {cat:"Recruiting",amt:105000,budget:110000},
    {cat:"Facility Maintenance",amt:128000,budget:130000},
    {cat:"Medical / Athletic Training",amt:62000,budget:65000},
    {cat:"Sports Science / Technology",amt:48000,budget:50000},
    {cat:"NIL Compliance",amt:18000,budget:22000},
    {cat:"Marketing & Brand",amt:42000,budget:45000},
  ],
};

const CAMPS = [
  {id:1,name:"Elite ID Clinic – Spring",dates:"Mar 15–16",capacity:50,registered:45,status:"Almost Full",price:295,revenue:13275,channel:"Instagram Ads"},
  {id:2,name:"Youth Skills Academy",dates:"Jun 10–14",capacity:150,registered:112,status:"Open",price:425,revenue:47600,channel:"Email / Website"},
  {id:3,name:"Winter GK Union",dates:"Jan 15",capacity:20,registered:12,status:"Open",price:150,revenue:1800,channel:"Direct Outreach"},
  {id:4,name:"Summer Elite ID Camp",dates:"Jul 7–11",capacity:80,registered:0,status:"Planning",price:395,revenue:0,channel:"TBD"},
];

const ACADEMICS = [
  {id:1,player:"Talyn Guthrie",major:"Communications",gpa:3.0,credits:92,status:"Good Standing",studyHall:false,tutoring:false,risk:"Low",advisor:"Prof. Dana Wells"},
  {id:2,player:"Eden Jones",major:"Sports Mgmt",gpa:3.6,credits:98,status:"Good Standing",studyHall:false,tutoring:false,risk:"Low",advisor:"Prof. Dana Wells"},
  {id:3,player:"Priya Patel",major:"Undecided",gpa:2.5,credits:45,status:"Academic Risk",studyHall:true,tutoring:true,risk:"High",advisor:"Prof. Dana Wells"},
  {id:4,player:"Olivia Lee",major:"General Studies",gpa:2.4,credits:32,status:"Academic Risk",studyHall:true,tutoring:true,risk:"Critical",advisor:"Prof. Dana Wells"},
  {id:5,player:"Amara Diallo",major:"Communications",gpa:2.7,credits:55,status:"Monitor",studyHall:true,tutoring:false,risk:"Med",advisor:"Prof. Dana Wells"},
  {id:6,player:"Elle Rowlands",major:"Undecided",gpa:2.8,credits:18,status:"Monitor",studyHall:true,tutoring:false,risk:"Med",advisor:"Prof. Dana Wells"},
  {id:7,player:"Mariama Dabo",major:"Social Work",gpa:2.9,credits:42,status:"Monitor",studyHall:false,tutoring:false,risk:"Med",advisor:"Prof. Dana Wells"},
  {id:8,player:"Layla Hassan",major:"Pre-Med",gpa:3.9,credits:88,status:"Dean's List",studyHall:false,tutoring:false,risk:"None",advisor:"Prof. Dana Wells"},
];

/* ============================================================
   GLOBAL EDITABLE DATA STORE
   All mutable data lives here so any module can read/write it.
   ============================================================ */
const useAppData = () => {
  const [roster,    setRoster]    = useState(ROSTER.map(p=>({...p})));
  const [recruits,  setRecruits]  = useState(RECRUITS.map(r=>({...r})));
  const [staffList, setStaffList] = useState(STAFF_LIST.map(s=>({...s, tasks:[...s.tasks.map(t=>({...t}))]})));
  const [injuries,  setInjuries]  = useState(INJURIES.map(i=>({...i})));
  const [nilDeals,  setNilDeals]  = useState(NIL_DEALS.map(d=>({...d})));
  const [camps,     setCamps]     = useState(CAMPS.map(c=>({...c})));
  const [donors,    setDonors]    = useState(DONORS.map(d=>({...d})));
  const [schedule,  setSchedule]  = useState(SCHEDULE.map(g=>({...g})));
  const [scoutNotes,setScoutNotes]= useState(SCOUTING_NOTES.map(n=>({...n})));

  const updatePlayer = useCallback((id, field, value) => {
    setRoster(prev => prev.map(p => p.id===id ? {...p, [field]: isNaN(value)||value===''?value:Number(value)} : p));
  }, []);

  const addPlayer = useCallback(() => {
    const id = Date.now();
    setRoster(prev => [...prev, {
      id, name:"New Player", pos:"CM", yr:"Fr", gpa:3.0, eq:0, aid:0,
      status:"Active", jersey:99, goals:0, assists:0, apps:0,
      injury:null, elig:"Y1", major:"Undecided"
    }]);
  }, []);

  const removePlayer = useCallback((id) => {
    setRoster(prev => prev.filter(p => p.id !== id));
  }, []);

  const updateRecruit = useCallback((id, field, value) => {
    setRecruits(prev => prev.map(r => r.id===id ? {...r, [field]: isNaN(value)||value===''||typeof value==='string'?value:Number(value)} : r));
  }, []);

  const addRecruit = useCallback(() => {
    setRecruits(prev => [...prev, {
      id:Date.now(), name:"New Prospect", pos:"CM", gradYr:2025,
      gpa:3.0, rating:4.0, state:"PA", status:"Interested",
      contacts:"", offer:"TBD", club:"", notes:"", priority:"Med"
    }]);
  }, []);

  const removeRecruit = useCallback((id) => {
    setRecruits(prev => prev.filter(r => r.id !== id));
  }, []);

  const updateInjury = useCallback((id, field, value) => {
    setInjuries(prev => prev.map(i => i.id===id ? {...i, [field]:value} : i));
  }, []);

  const addInjury = useCallback(() => {
    setInjuries(prev => [...prev, {
      id:Date.now(), player:"", pos:"", type:"", sev:"Mild",
      injured:"", returnEst:"", status:"Day-to-Day", missed:0, protocol:""
    }]);
  }, []);

  const updateNil = useCallback((id, field, value) => {
    setNilDeals(prev => prev.map(d => d.id===id ? {...d, [field]:value} : d));
  }, []);

  const updateCamp = useCallback((id, field, value) => {
    setCamps(prev => prev.map(c => c.id===id ? {...c, [field]:isNaN(value)||value===''?value:Number(value)} : c));
  }, []);

  const addCamp = useCallback(() => {
    setCamps(prev => [...prev, {
      id:Date.now(), name:"New Camp", dates:"", capacity:50,
      registered:0, status:"Planning", price:0, revenue:0, channel:""
    }]);
  }, []);

  const updateDonor = useCallback((id, field, value) => {
    setDonors(prev => prev.map(d => d.id===id ? {...d, [field]:value} : d));
  }, []);

  const toggleTask = useCallback((staffId, taskIdx) => {
    setStaffList(prev => prev.map(s => s.id===staffId
      ? {...s, tasks: s.tasks.map((t,i)=>i===taskIdx?{...t,done:!t.done}:t)}
      : s
    ));
  }, []);

  const addTask = useCallback((staffId) => {
    setStaffList(prev => prev.map(s => s.id===staffId
      ? {...s, tasks:[...s.tasks, {text:"New Task",due:"",done:false,pri:"Med"}]}
      : s
    ));
  }, []);

  const updateTask = useCallback((staffId, taskIdx, field, value) => {
    setStaffList(prev => prev.map(s => s.id===staffId
      ? {...s, tasks: s.tasks.map((t,i)=>i===taskIdx?{...t,[field]:value}:t)}
      : s
    ));
  }, []);

  return {
    roster, recruits, staffList, injuries, nilDeals, camps, donors, schedule, scoutNotes,
    updatePlayer, addPlayer, removePlayer,
    updateRecruit, addRecruit, removeRecruit,
    updateInjury, addInjury,
    updateNil, updateCamp, addCamp,
    updateDonor, toggleTask, addTask, updateTask,
  };
};

// Global context
const AppDataContext = React.createContext(null);
const useData = () => React.useContext(AppDataContext);

/* ============================================================
   INLINE EDITABLE CELL COMPONENT
   Click any cell to edit it inline — blur or Enter to save
   ============================================================ */
const EditCell = ({ value, onChange, type="text", options=null, style={}, className="" }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => { setDraft(value); }, [value]);
  useEffect(() => { if (editing && inputRef.current) inputRef.current.focus(); }, [editing]);

  const commit = () => { setEditing(false); if (draft !== value) onChange(draft); };

  if (editing) {
    if (options) {
      return (
        <select ref={inputRef} value={draft}
          onChange={e=>setDraft(e.target.value)}
          onBlur={commit}
          style={{background:"var(--s3)",border:"1px solid var(--gold)",borderRadius:5,
            padding:"2px 6px",color:"var(--t1)",fontSize:12,outline:"none",...style}}>
          {options.map(o=><option key={o} value={o}>{o}</option>)}
        </select>
      );
    }
    return (
      <input ref={inputRef} value={draft} type={type}
        onChange={e=>setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={e=>{if(e.key==="Enter")commit();if(e.key==="Escape"){setDraft(value);setEditing(false);}}}
        style={{background:"var(--s3)",border:"1px solid var(--gold)",borderRadius:5,
          padding:"2px 6px",color:"var(--t1)",fontSize:12,outline:"none",width:"100%",...style}}
      />
    );
  }

  return (
    <span onClick={()=>setEditing(true)} className={className}
      title="Click to edit"
      style={{cursor:"text",borderRadius:4,padding:"1px 3px",transition:"background .12s",
        display:"inline-block",minWidth:20,...style,
      }}
      onMouseEnter={e=>e.currentTarget.style.background="rgba(255,184,28,.1)"}
      onMouseLeave={e=>e.currentTarget.style.background="transparent"}
    >
      {value??'—'}
    </span>
  );
};

/* Edit mode toggle banner */
const EditBanner = ({ editMode, setEditMode }) => editMode ? (
  <div style={{position:"fixed",bottom:18,left:"50%",transform:"translateX(-50%)",
    background:"linear-gradient(135deg,rgba(255,184,28,.95),rgba(224,153,0,.95))",
    borderRadius:30,padding:"9px 22px",zIndex:9999,display:"flex",alignItems:"center",gap:12,
    boxShadow:"0 8px 32px rgba(255,184,28,.4)",backdropFilter:"blur(12px)"}}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
    <span style={{fontSize:12,fontWeight:800,color:"#000",letterSpacing:".5px"}}>EDIT MODE — Click any cell to edit</span>
    <button onClick={()=>setEditMode(false)}
      style={{background:"rgba(0,0,0,.15)",border:"none",borderRadius:20,padding:"3px 12px",
        fontSize:11,fontWeight:700,color:"#000",cursor:"pointer"}}>
      Done Editing
    </button>
  </div>
) : null;

/* ============================================================
   SMALL COMPONENTS
   ============================================================ */
const SDot = ({s}) => {
  const c = {Active:"#22C55E","At-Risk":"var(--gold)",Injured:"var(--r)",Cleared:"var(--b)"};
  return <span style={{display:"inline-block",width:7,height:7,borderRadius:"50%",background:c[s]||"var(--t3)",marginRight:6,flexShrink:0}}/>;
};

const Stars = ({v}) => (
  <span style={{display:"inline-flex",gap:2,alignItems:"center"}}>
    {[1,2,3,4,5].map(i=>(
      <svg key={i} width="9" height="9" viewBox="0 0 24 24" fill={i<=Math.floor(v)?"var(--gold)":"#1C2A50"} stroke={i<=Math.floor(v)?"var(--gold)":"#2C3A60"} strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
    <span style={{fontSize:10,color:"var(--gold)",marginLeft:3,fontFamily:"var(--ff-m)",fontWeight:600}}>{v.toFixed(1)}</span>
  </span>
);

const Donut = ({pct,color="var(--gold)",size=120,sw=14}) => {
  const r=(size-sw)/2, c=2*Math.PI*r, off=c*(1-pct/100);
  return (
    <div style={{position:"relative",width:size,height:size,display:"inline-flex",alignItems:"center",justifyContent:"center"}}>
      <svg width={size} height={size} style={{transform:"rotate(-90deg)",position:"absolute"}}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--s4)" strokeWidth={sw}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={sw}
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
          style={{transition:"stroke-dashoffset .8s ease",filter:`drop-shadow(0 0 8px ${color}55)`}}/>
      </svg>
      <div style={{zIndex:1,textAlign:"center"}}>
        <div style={{fontFamily:"var(--ff-h)",fontSize:size*.21,lineHeight:1,color}}>{pct}%</div>
        <div style={{fontSize:9,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".5px",marginTop:2}}>utilized</div>
      </div>
    </div>
  );
};

/* ============================================================
   AI INSIGHT PANEL
   ============================================================ */
const AIPanel = ({context}) => {
  const [loading,setLoading]=useState(false);
  const [insights,setInsights]=useState(null);
  const [err,setErr]=useState(null);

  const PROMPTS = {
    dashboard:`You are an elite NCAA women's soccer analyst for Pitt "Forged in Steel" program. Analyze: Record 13W-5L-2D, ACC Semifinalist. Key issues: 4 players academic at-risk (Priya Patel 2.5 GPA, Olivia Lee 2.4 GPA critical), Amara Diallo injured ankle returning Jan 12. Top recruit Mattie Caldwell committed. Scholarship: 13.04/14.0 EQ used. 3 seniors departing (Torres, Jones, Tew). Return 3 actionable strategic insights as JSON: {"insights":[{"category":"CATEGORY","priority":"High|Med|Low","title":"TITLE","body":"2-3 sentences","action":"1 sentence"}]}`,
    roster:`Analyze Pitt Women's Soccer roster: 25 players. 4 at academic risk (GPA <2.7). Positions thin: only 1 LB (Brianna Torres departing Sr), GK depth (Marchetti Sr departing). Strength: ST with Guthrie 19G, midfield Ottah 8G/12A. Seniors departing: Torres (LB), Jones (LW), Tew (LW). Transfer portal: Camille Bernard (ST) and Rosa Esteban (CDM) being pursued. Return JSON insights.`,
    scholarship:`NCAA Women's Soccer scholarship cap: 14.0 EQ. Pitt using 13.04 EQ (93.1%). Total aid: $904,213. Surplus: 0.96 EQ remaining. 4 seniors departing freeing 3.74 EQ. Committed recruit: Mattie Caldwell (Full). 3 players walk-on (0 EQ): Maya Bright, Sophie Rourke, Sage Stelzer - all performing. Opportunity to reallocate. Return JSON insights.`,
    recruiting:`Pitt recruiting pipeline: Committed: Mattie Caldwell (ST, Full). Extended offers: Jess Kowalski (CM, 87% - deciding vs Duke), Keely Park (GK, Full), Amelia Forte (LB, 75%). Visit scheduled: Nadia Osei (CB, Full - top priority). Soft offer: Destiny Cruz (CM, GPA concern 2.8). Program needs: LB replacement for Torres, LW for Jones/Tew, GK depth for Marchetti. Return JSON insights.`,
    academics:`Academic risk analysis Pitt Women's Soccer: Critical: Olivia Lee GPA 2.4 (required 2.0 NCAA min, Pitt requires 2.5 for playing eligibility - AT RISK OF INELIGIBILITY). High risk: Priya Patel GPA 2.5. Monitor: Amara Diallo 2.7, Elle Rowlands 2.8, Mariama Dabo 2.9. Spring semester starts Jan 13. Eligibility certification due Jan 15. Return JSON insights.`,
  };

  const load = async () => {
    setLoading(true); setErr(null); setInsights(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,
          system:"NCAA soccer analyst. Return ONLY valid JSON. No markdown, no backticks, no preamble.",
          messages:[{role:"user",content:PROMPTS[context]||PROMPTS.dashboard}]})});
      const d=await res.json();
      const txt=d.content?.[0]?.text||"";
      const parsed=JSON.parse(txt.replace(/```json|```/g,"").trim());
      setInsights(parsed.insights||[]);
    } catch(e){setErr("AI connection unavailable.");}
    finally{setLoading(false);}
  };

  useEffect(()=>{load();},[context]);

  const pc={High:"var(--r)",Med:"var(--gold)",Low:"var(--b)"};
  return (
    <div style={{background:"linear-gradient(135deg,rgba(0,53,148,.15),rgba(255,184,28,.06))",border:"1px solid rgba(255,184,28,.18)",borderRadius:12,padding:18}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,var(--navy),var(--gold2))",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </div>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:"var(--t1)"}}>AI Decision Intelligence</div>
            <div style={{fontSize:10,color:"var(--t3)"}}>Powered by Claude · Pitt-specific analysis</div>
          </div>
        </div>
        <button className="btn-ghost" onClick={load} style={{fontSize:11,padding:"4px 11px"}}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
          Refresh
        </button>
      </div>
      {loading&&[1,2,3].map(i=>(
        <div key={i} style={{borderRadius:8,padding:14,marginBottom:8}} className="shimmer">
          <div style={{height:10,width:"40%",borderRadius:3,background:"var(--s4)",marginBottom:8}}/>
          <div style={{height:9,width:"85%",borderRadius:3,background:"var(--s4)",marginBottom:5}}/>
          <div style={{height:9,width:"65%",borderRadius:3,background:"var(--s4)"}}/>
        </div>
      ))}
      {err&&<div style={{color:"var(--r)",fontSize:12,padding:10,background:"rgba(255,68,68,.08)",borderRadius:8}}>{err}</div>}
      {insights&&insights.map((ins,i)=>(
        <div key={i} className="fade-in" style={{background:"var(--s2)",border:`1px solid ${pc[ins.priority]}20`,borderLeft:`3px solid ${pc[ins.priority]}`,borderRadius:9,padding:14,marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
            <span style={{fontSize:10,fontWeight:700,color:pc[ins.priority],letterSpacing:".8px",textTransform:"uppercase",fontFamily:"var(--ff-c)"}}>{ins.category}</span>
            <span className="tag" style={{background:`${pc[ins.priority]}15`,color:pc[ins.priority],fontSize:9}}>{ins.priority}</span>
          </div>
          <div style={{fontSize:13,fontWeight:700,color:"var(--t1)",marginBottom:5}}>{ins.title}</div>
          <div style={{fontSize:12,color:"var(--t2)",lineHeight:1.55,marginBottom:7}}>{ins.body}</div>
          <div style={{fontSize:11,color:"var(--gold)",fontWeight:600,display:"flex",gap:5,alignItems:"flex-start"}}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{flexShrink:0,marginTop:1}}><polyline points="20 6 9 17 4 12"/></svg>
            {ins.action}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ============================================================
   NAV CONFIG
   ============================================================ */
const NAV = [
  {id:"dashboard",label:"Dashboard",icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",section:"Program"},
  {id:"roster",label:"Roster",icon:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",section:"Program"},
  {id:"depthchart",label:"Depth Chart",icon:"M4 6h16M4 10h16M4 14h16M4 18h7",section:"Program"},
  {id:"schedule",label:"Schedule & Results",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",section:"Program"},
  {id:"scholarship",label:"Scholarship Budget",icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",section:"Program"},
  {id:"programbudget",label:"Program Budget",icon:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",section:"Program"},
  {id:"recruiting",label:"Recruiting",icon:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",section:"Program"},
  {id:"scouting",label:"Scouting & Film",icon:"M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",section:"Program"},
  {id:"transfer",label:"Transfer Portal",icon:"M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",section:"Program"},
  {id:"nil",label:"NIL Management",icon:"M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",section:"Program"},
  {id:"sportsscience",label:"Sports Science",icon:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",section:"Performance"},
  {id:"medical",label:"Medical & Injury",icon:"M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",section:"Performance"},
  {id:"development",label:"Player Development",icon:"M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",section:"Performance"},
  {id:"academics",label:"Academics",icon:"M12 14l9-5-9-5-9 5 9 5z",section:"Academic"},
  {id:"staff",label:"Staff & Tasks",icon:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",section:"Operations"},
  {id:"camps",label:"Camps & Clinics",icon:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",section:"Operations"},
  {id:"alumni",label:"Alumni & Donors",icon:"M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",section:"Operations"},
  {id:"marketing",label:"Marketing / Media",icon:"M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",section:"Operations"},
  {id:"sportsinfo",label:"Sports Information",icon:"M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",section:"Operations"},
];

/* ============================================================
   LOGIN SCREEN
   ============================================================ */
const Login = ({onLogin}) => {
  const [selected,setSelected]=useState(null);
  const [pin,setPin]=useState("");
  const [err,setErr]=useState("");

  const attempt = () => {
    if (!selected) return;
    if (selected.pin===pin) { onLogin(selected); }
    else { setErr("Incorrect PIN. Try again."); setPin(""); }
  };

  return (
    <div className="login-bg" style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:0}}>
      {/* Header branding */}
      <div style={{textAlign:"center",marginBottom:40}}>
        <div style={{display:"flex",alignItems:"center",gap:14,justifyContent:"center",marginBottom:12}}>
          <div style={{width:56,height:56,borderRadius:14,background:"linear-gradient(135deg,var(--navy),var(--navy3))",border:"2px solid var(--gold)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 30px rgba(255,184,28,.3)"}}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          </div>
          <div style={{textAlign:"left"}}>
            <div style={{fontFamily:"var(--ff-h)",fontSize:28,letterSpacing:2,color:"var(--t1)",lineHeight:1}}>PITT WOMEN'S SOCCER</div>
            <div style={{fontSize:12,color:"var(--gold)",fontFamily:"var(--ff-c)",letterSpacing:3,textTransform:"uppercase",marginTop:2}}>Forged in Steel</div>
          </div>
        </div>
        <div style={{width:180,height:1,background:"linear-gradient(90deg,transparent,var(--gold),transparent)",margin:"0 auto"}}/>
        <div style={{fontSize:11,color:"var(--t3)",marginTop:10,letterSpacing:1,textTransform:"uppercase",fontFamily:"var(--ff-c)"}}>Staff Access Portal · {PROGRAM.season}</div>
      </div>

      <div style={{width:580,background:"var(--s1)",border:"1px solid var(--bdg)",borderRadius:16,padding:28,boxShadow:"0 24px 60px rgba(0,0,0,.6)"}}>
        <div style={{fontSize:11,fontWeight:700,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".8px",marginBottom:14,fontFamily:"var(--ff-c)"}}>Select Your Role</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:20,maxHeight:340,overflowY:"auto"}}>
          {STAFF_ACCOUNTS.map(acc=>{
            const role=ROLES[acc.role];
            const isSelected=selected?.id===acc.id;
            return (
              <button key={acc.id} onClick={()=>{setSelected(acc);setPin("");setErr("");}}
                style={{padding:"10px 12px",borderRadius:9,border:`1px solid ${isSelected?"var(--gold)":"var(--bd2)"}`,
                  background:isSelected?"linear-gradient(135deg,rgba(255,184,28,.12),rgba(0,53,148,.2))":"var(--s2)",
                  display:"flex",alignItems:"center",gap:9,cursor:"pointer",transition:"all .15s",textAlign:"left"}}>
                <div style={{width:34,height:34,borderRadius:8,background:isSelected?"var(--gold)":role?.color?`${role.color}20`:"var(--s4)",border:`1px solid ${isSelected?"var(--gold)":role?.color||"var(--bd)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--ff-h)",fontSize:13,color:isSelected?"#000":role?.color||"var(--t2)",flexShrink:0,transition:"all .15s"}}>
                  {acc.initials}
                </div>
                <div style={{minWidth:0}}>
                  <div style={{fontSize:11,fontWeight:700,color:isSelected?"var(--t1)":"var(--t2)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{acc.name.split(" ").slice(-2).join(" ")}</div>
                  <div style={{fontSize:9,color:isSelected?role?.color||"var(--gold)":"var(--t3)",fontFamily:"var(--ff-c)",textTransform:"uppercase",letterSpacing:".3px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{acc.desc||role?.label}</div>
                </div>
              </button>
            );
          })}
        </div>

        {selected&&(
          <div className="fade-in">
            <div style={{fontSize:12,color:"var(--t3)",marginBottom:8,fontFamily:"var(--ff-c)",textTransform:"uppercase",letterSpacing:".8px"}}>Enter PIN for {selected.name.split(" ")[0]}</div>
            <div style={{display:"flex",gap:10}}>
              <input type="password" value={pin} onChange={e=>setPin(e.target.value)} onKeyDown={e=>e.key==="Enter"&&attempt()}
                placeholder="••••" maxLength={4}
                style={{flex:1,background:"var(--s3)",border:`1px solid ${err?"var(--r)":"var(--bd2)"}`,borderRadius:9,padding:"11px 14px",color:"var(--t1)",fontSize:18,outline:"none",letterSpacing:"8px",fontFamily:"var(--ff-m)"}}/>
              <button className="btn-gold" onClick={attempt} style={{fontSize:13}}>Enter →</button>
            </div>
            {err&&<div style={{color:"var(--r)",fontSize:12,marginTop:8}}>{err}</div>}
            <div style={{fontSize:10,color:"var(--t3)",marginTop:8}}>Demo: all PINs shown in select above (1234 = Head Coach)</div>
          </div>
        )}
        {!selected&&(
          <div style={{fontSize:11,color:"var(--t3)",textAlign:"center",padding:"10px 0",fontFamily:"var(--ff-c)",letterSpacing:".5px"}}>
            SELECT A ROLE ABOVE TO CONTINUE
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   SIDEBAR
   ============================================================ */
const Sidebar = ({active,setActive,user,onLogout}) => {
  const role=user?.role;
  const atRisk=ROSTER.filter(p=>p.gpa<2.7).length;
  const openTasks=STAFF_LIST.flatMap(s=>s.tasks).filter(t=>!t.done).length;
  const sections=[...new Set(NAV.map(n=>n.section))];

  return (
    <div style={{width:222,minWidth:222,background:"var(--s1)",borderRight:"1px solid var(--bd)",display:"flex",flexDirection:"column",height:"100vh",overflow:"hidden"}}>
      {/* Logo */}
      <div style={{padding:"16px 14px",borderBottom:"1px solid var(--bd)",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <div style={{width:40,height:40,borderRadius:11,background:"linear-gradient(135deg,var(--navy),var(--navy3))",border:"1.5px solid var(--gold)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 0 18px rgba(255,184,28,.2)"}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          </div>
          <div>
            <div style={{fontFamily:"var(--ff-h)",fontSize:14,letterSpacing:1,color:"var(--t1)",lineHeight:1.1}}>PITT WOMEN'S<br/>SOCCER</div>
          </div>
        </div>
        <div style={{background:"linear-gradient(135deg,rgba(255,184,28,.1),rgba(0,53,148,.15))",borderRadius:8,padding:"7px 10px",textAlign:"center",border:"1px solid var(--bdg)"}}>
          <div style={{fontFamily:"var(--ff-c)",fontSize:11,color:"var(--gold)",letterSpacing:2,textTransform:"uppercase",fontWeight:700}}>⚡ FORGED IN STEEL</div>
        </div>
        {/* Record */}
        <div style={{display:"flex",justifyContent:"space-around",marginTop:10}}>
          {[["13","W","var(--g)"],["5","L","var(--r)"],["2","D","var(--gold)"]].map(([v,l,c])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontFamily:"var(--ff-h)",fontSize:22,color:c,lineHeight:1}}>{v}</div>
              <div style={{fontSize:9,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".5px"}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      {(atRisk>0||openTasks>0)&&(
        <div style={{padding:"7px 12px",background:"rgba(255,184,28,.05)",borderBottom:"1px solid rgba(255,184,28,.1)",flexShrink:0}}>
          {atRisk>0&&<div style={{fontSize:10,color:"var(--gold)",display:"flex",gap:5,alignItems:"center",marginBottom:2}}>
            <svg width="10" height="10" fill="var(--gold)" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
            {atRisk} players academic risk
          </div>}
          {openTasks>0&&<div style={{fontSize:10,color:"var(--b)",display:"flex",gap:5,alignItems:"center"}}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--b)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {openTasks} open staff tasks
          </div>}
        </div>
      )}

      {/* Nav */}
      <nav style={{flex:1,overflowY:"auto",padding:"6px 0"}}>
        {sections.map(sec=>{
          const items=NAV.filter(n=>n.section===sec&&canAccess(role,n.id));
          if(items.length===0)return null;
          return (
            <div key={sec}>
              <div style={{padding:"10px 14px 4px",fontSize:9,color:"var(--t3)",textTransform:"uppercase",letterSpacing:"1.2px",fontWeight:700,fontFamily:"var(--ff-c)"}}>{sec}</div>
              {items.map(item=>{
                const isA=active===item.id;
                return (
                  <button key={item.id} onClick={()=>setActive(item.id)}
                    style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:"8px 14px",
                      background:isA?"linear-gradient(90deg,rgba(0,53,148,.35),rgba(0,53,148,.08))":"transparent",
                      borderLeft:`2px solid ${isA?"var(--gold)":"transparent"}`,
                      color:isA?"var(--t1)":"var(--t3)",transition:"all .12s",textAlign:"left"}}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={isA?"var(--gold)":"currentColor"} strokeWidth={isA?"2":"1.5"} style={{flexShrink:0}}>
                      <path d={item.icon}/>
                    </svg>
                    <span style={{fontSize:12,fontWeight:isA?600:400,fontFamily:"var(--ff-c)",letterSpacing:".2px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item.label}</span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* User footer */}
      <div style={{padding:"11px 14px",borderTop:"1px solid var(--bd)",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <div style={{width:34,height:34,borderRadius:9,background:"var(--navy)",border:"1.5px solid var(--gold)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--ff-h)",fontSize:14,color:"var(--gold)",flexShrink:0}}>
            {user?.initials}
          </div>
          <div style={{flex:1,overflow:"hidden"}}>
            <div style={{fontSize:12,fontWeight:700,color:"var(--t1)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{user?.name?.split(" ").slice(-1)[0]}</div>
            <div style={{fontSize:9,color:"var(--gold)",textTransform:"uppercase",letterSpacing:".5px",fontFamily:"var(--ff-c)"}}>{ROLES[user?.role]?.label}</div>
          </div>
          <button onClick={onLogout} style={{color:"var(--t3)",flexShrink:0}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   TOP BAR
   ============================================================ */
const TopBar = ({title,sub,editMode,setEditMode,userRole}) => (
  <div style={{height:56,borderBottom:"1px solid var(--bd)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 26px",background:"rgba(10,15,30,.85)",backdropFilter:"blur(12px)",flexShrink:0}}>
    <div>
      <div style={{fontFamily:"var(--ff-h)",fontSize:24,letterSpacing:2,color:"var(--t1)",lineHeight:1}}>{title}</div>
      {sub&&<div style={{fontSize:10,color:"var(--t3)",marginTop:1,fontFamily:"var(--ff-c)",letterSpacing:".5px",textTransform:"uppercase"}}>{sub}</div>}
    </div>
    <div style={{display:"flex",gap:10,alignItems:"center"}}>
      <button className="btn-ghost" style={{fontSize:12,padding:"6px 14px"}}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Quick Upload
      </button>
      {(userRole==="head_coach"||userRole==="technical_director")&&(
        <button onClick={()=>setEditMode&&setEditMode(e=>!e)}
          style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer",transition:"all .2s",
            background:editMode?"var(--gold)":"var(--s3)",
            color:editMode?"#000":"var(--t2)",
            border:`1px solid ${editMode?"var(--gold)":"var(--bd2)"}`}}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          {editMode?"Editing…":"Edit Mode"}
        </button>
      )}
      <div style={{display:"flex",alignItems:"center",gap:6,background:"var(--s2)",border:"1px solid var(--bd2)",borderRadius:20,padding:"5px 12px"}}>
        <div style={{width:7,height:7,borderRadius:"50%",background:"var(--g)",boxShadow:"0 0 8px var(--g)"}} className="pulse"/>
        <span style={{fontSize:11,color:"var(--t2)",fontWeight:600}}>High-Performance Active</span>
      </div>
      <button className="btn-gold" style={{fontSize:12,padding:"7px 16px"}}>Export Insights</button>
    </div>
  </div>
);

/* ============================================================
   MODULE: DASHBOARD
   ============================================================ */
const Dashboard = () => {
  const eq=ROSTER.reduce((a,p)=>a+p.eq,0);
  const avgGpa=(ROSTER.reduce((a,p)=>a+p.gpa,0)/ROSTER.length).toFixed(2);
  const atRisk=ROSTER.filter(p=>p.gpa<2.7);
  const openTasks=STAFF_LIST.flatMap(s=>s.tasks).filter(t=>!t.done);
  const rev=BUDGET.revenue.reduce((a,r)=>a+r.amt,0);
  const exp=BUDGET.expenses.reduce((a,e)=>a+e.amt,0);

  const kpis=[
    {lbl:"Scholarship Pool",val:`${eq.toFixed(2)} / ${BUDGET.cap}`,sub:"EQ · NCAA Women's Cap",color:"var(--gold)",pct:Math.round((eq/BUDGET.cap)*100),icon:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",ghost:"$"},
    {lbl:"Roster Count",val:ROSTER.length,sub:`Target: 28 Players · ${ROSTER.filter(p=>p.status==="Active").length} Active`,color:"var(--b)",pct:Math.round((ROSTER.length/28)*100),icon:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",ghost:"👥"},
    {lbl:"Academic Health",val:`${avgGpa} GPA`,sub:`Goal: 3.2 · ${atRisk.length} At-Risk`,color:parseFloat(avgGpa)>=3.2?"var(--g)":"var(--gold)",pct:Math.round((parseFloat(avgGpa)/4)*100),icon:"M12 14l9-5-9-5-9 5 9 5z",ghost:"🎓"},
    {lbl:"Active Tasks",val:openTasks.length,sub:`${STAFF_LIST.flatMap(s=>s.tasks).filter(t=>t.done).length} Completed · Staff Priority`,color:openTasks.length>6?"var(--r)":"var(--gold)",pct:Math.round((STAFF_LIST.flatMap(s=>s.tasks).filter(t=>t.done).length/STAFF_LIST.flatMap(s=>s.tasks).length)*100),icon:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2",ghost:"✓"},
    {lbl:"Recruiting Pipeline",val:RECRUITS.length,sub:`${RECRUITS.filter(r=>r.status==="Verbal Commit").length} Committed · ${RECRUITS.filter(r=>r.status==="Offer Extended").length} Offers`,color:"var(--o)",pct:Math.round((RECRUITS.filter(r=>r.status==="Verbal Commit").length/4)*100),icon:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",ghost:"🎯"},
    {lbl:"Program Budget",val:`$${(rev/1000000).toFixed(2)}M`,sub:`Net +$${((rev-exp)/1000).toFixed(0)}K · ${Math.round((exp/rev)*100)}% utilized`,color:"var(--g)",pct:Math.round((exp/rev)*100),icon:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10",ghost:"$"},
  ];

  return (
    <div style={{padding:"22px 26px",overflowY:"auto",height:"100%",display:"flex",flexDirection:"column",gap:20}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div className="section-h">Command Center</div>
          <div className="section-sub">{PROGRAM.school} · {PROGRAM.div} · {PROGRAM.season}</div>
        </div>
        <div style={{background:"linear-gradient(135deg,rgba(255,184,28,.12),rgba(0,53,148,.2))",border:"1px solid var(--bdg)",borderRadius:10,padding:"8px 16px",textAlign:"center"}}>
          <div style={{fontFamily:"var(--ff-c)",fontSize:10,color:"var(--gold)",letterSpacing:2,textTransform:"uppercase"}}>ACC SEMIFINALIST 2024</div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
        {kpis.map((k,i)=>(
          <div key={i} className="kpi fade-in" style={{animationDelay:`${i*.05}s`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div style={{width:34,height:34,borderRadius:8,background:`${k.color}15`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={k.color} strokeWidth="1.8"><path d={k.icon}/></svg>
              </div>
              <span style={{fontFamily:"var(--ff-m)",fontSize:12,color:k.color,fontWeight:600}}>{k.pct}%</span>
            </div>
            <div className="kpi-lbl">{k.lbl}</div>
            <div className="kpi-val" style={{color:k.color,fontSize:30}}>{k.val}</div>
            <div className="kpi-sub">{k.sub}</div>
            <div className="pbar" style={{marginTop:10}}>
              <div className="pfill" style={{width:`${k.pct}%`,background:k.color}}/>
            </div>
            <div className="kpi-ghost" style={{fontSize:60,lineHeight:1,fontFamily:"var(--ff-h)"}}>{k.ghost}</div>
          </div>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:18}}>
        <AIPanel context="dashboard"/>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div className="card" style={{textAlign:"center"}}>
            <div style={{fontSize:11,fontWeight:700,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".8px",marginBottom:14,fontFamily:"var(--ff-c)"}}>Scholarship Budget</div>
            <div style={{display:"flex",justifyContent:"center",marginBottom:12}}>
              <Donut pct={Math.round((eq/BUDGET.cap)*100)} size={120} sw={14} color="var(--gold)"/>
            </div>
            <div style={{display:"flex",justifyContent:"space-around",fontSize:11}}>
              <div style={{textAlign:"center"}}><div style={{fontFamily:"var(--ff-m)",fontSize:16,color:"var(--gold)",fontWeight:700}}>{eq.toFixed(2)}</div><div style={{color:"var(--t3)"}}>Used EQ</div></div>
              <div style={{textAlign:"center"}}><div style={{fontFamily:"var(--ff-m)",fontSize:16,color:"var(--t2)",fontWeight:700}}>{(BUDGET.cap-eq).toFixed(2)}</div><div style={{color:"var(--t3)"}}>Remaining</div></div>
            </div>
          </div>
          <div className="card">
            <div style={{fontSize:11,fontWeight:700,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".8px",marginBottom:10,fontFamily:"var(--ff-c)"}}>Urgent Alerts</div>
            {atRisk.map(p=>(
              <div key={p.id} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 9px",background:"rgba(255,184,28,.06)",border:"1px solid rgba(255,184,28,.15)",borderRadius:7,marginBottom:6}}>
                <svg width="11" height="11" fill="var(--gold)" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
                <div style={{flex:1}}><div style={{fontSize:11,fontWeight:700,color:"var(--t1)"}}>{p.name}</div><div style={{fontSize:10,color:"var(--t3)"}}>GPA {p.gpa} · Academic Risk</div></div>
              </div>
            ))}
            {INJURIES.filter(i=>i.status!=="Cleared").map(inj=>(
              <div key={inj.id} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 9px",background:"rgba(255,68,68,.06)",border:"1px solid rgba(255,68,68,.15)",borderRadius:7,marginBottom:6}}>
                <svg width="11" height="11" fill="none" stroke="var(--r)" strokeWidth="2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                <div style={{flex:1}}><div style={{fontSize:11,fontWeight:700,color:"var(--t1)"}}>{inj.player}</div><div style={{fontSize:10,color:"var(--t3)"}}>Returns {inj.returnEst}</div></div>
              </div>
            ))}
          </div>
          <div className="card">
            <div style={{fontSize:11,fontWeight:700,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".8px",marginBottom:10,fontFamily:"var(--ff-c)"}}>Season</div>
            <div style={{display:"flex",justifyContent:"space-around",marginBottom:8}}>
              {[["13","W","var(--g)"],["5","L","var(--r)"],["2","D","var(--gold)"]].map(([v,l,c])=>(
                <div key={l} style={{textAlign:"center"}}><div style={{fontFamily:"var(--ff-h)",fontSize:34,color:c,lineHeight:1}}>{v}</div><div style={{fontSize:9,color:"var(--t3)",textTransform:"uppercase"}}>{l}</div></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   MODULE: ROSTER
   ============================================================ */
const RosterMod = () => {
  const {roster, updatePlayer, addPlayer, removePlayer, editMode} = useData();
  const [pos,setPos]=useState("All");
  const [q,setQ]=useState("");
  const [srt,setSrt]=useState("jersey");
  const positions=["All","GK","CB","LB","RB","CDM","CM","LW","RW","ST"];
  const data=roster.filter(p=>(pos==="All"||p.pos===pos)&&p.name.toLowerCase().includes(q.toLowerCase()))
    .sort((a,b)=>srt==="gpa"?b.gpa-a.gpa:srt==="goals"?b.goals-a.goals:srt==="eq"?b.eq-a.eq:a.jersey-b.jersey);
  return (
    <div style={{padding:"22px 26px",overflowY:"auto",height:"100%",display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div className="section-h">Roster</div><div className="section-sub">{roster.length} Players · {roster.filter(p=>p.injury).length} Injured · {roster.filter(p=>p.status==="At-Risk").length} At-Risk</div></div>
        <button className="btn-gold" onClick={addPlayer}>+ Add Player</button>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{display:"flex",background:"var(--s2)",border:"1px solid var(--bd)",borderRadius:8,overflow:"hidden"}}>
          {positions.map(p=>(
            <button key={p} onClick={()=>setPos(p)} style={{padding:"5px 10px",fontSize:11,fontWeight:600,fontFamily:"var(--ff-c)",background:pos===p?"var(--gold)":"transparent",color:pos===p?"#000":"var(--t3)",border:"none",cursor:"pointer",transition:"all .12s"}}>{p}</button>
          ))}
        </div>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." style={{background:"var(--s2)",border:"1px solid var(--bd2)",borderRadius:8,padding:"6px 12px",color:"var(--t1)",fontSize:13,outline:"none",width:160}}/>
        <select value={srt} onChange={e=>setSrt(e.target.value)} style={{background:"var(--s2)",border:"1px solid var(--bd2)",borderRadius:8,padding:"6px 12px",color:"var(--t2)",fontSize:12,outline:"none"}}>
          <option value="jersey">Jersey #</option><option value="gpa">GPA</option><option value="goals">Goals</option><option value="eq">Scholarship</option>
        </select>
        {editMode&&<span style={{fontSize:11,color:"var(--gold)",fontFamily:"var(--ff-c)",fontWeight:700,letterSpacing:".5px"}}>✏️ CLICK ANY CELL TO EDIT</span>}
      </div>
      <div className="card" style={{padding:0,overflow:"hidden",flex:1}}>
        <table className="dt">
          <thead><tr><th>#</th><th>Player</th><th>Pos</th><th>Yr</th><th>Status</th><th>GPA</th><th>Apps</th><th>G</th><th>A</th><th>EQ</th><th>Aid $</th><th>Elig.</th><th>Major</th><th>Injury</th>{editMode&&<th>⚙</th>}</tr></thead>
          <tbody>
            {data.map(p=>(
              <tr key={p.id}>
                <td><span style={{fontFamily:"var(--ff-m)",color:"var(--t3)",fontSize:12}}>
                  {editMode?<EditCell value={p.jersey} onChange={v=>updatePlayer(p.id,'jersey',v)} type="number" style={{width:36,fontFamily:"var(--ff-m)"}}/>:p.jersey}
                </span></td>
                <td className="hl">
                  {editMode?<EditCell value={p.name} onChange={v=>updatePlayer(p.id,'name',v)} style={{fontWeight:600}}/>:p.name}
                </td>
                <td>
                  {editMode
                    ?<EditCell value={p.pos} onChange={v=>updatePlayer(p.id,'pos',v)} options={["GK","CB","LB","RB","CDM","CM","LW","RW","ST"]}/>
                    :<span className="tag td" style={{fontSize:10}}>{p.pos}</span>}
                </td>
                <td style={{color:"var(--t3)"}}>
                  {editMode?<EditCell value={p.yr} onChange={v=>updatePlayer(p.id,'yr',v)} options={["Fr","So","Jr","Sr"]} style={{width:44}}/>:p.yr}
                </td>
                <td><div style={{display:"flex",alignItems:"center"}}>
                  {editMode
                    ?<EditCell value={p.status} onChange={v=>updatePlayer(p.id,'status',v)} options={["Active","At-Risk","Injured"]}/>
                    :<><SDot s={p.status}/><span style={{fontSize:12,color:p.status==="Active"?"var(--g)":p.status==="At-Risk"?"var(--gold)":"var(--r)"}}>{p.status}</span></>}
                </div></td>
                <td><span style={{fontFamily:"var(--ff-m)",fontSize:13,fontWeight:700,color:p.gpa<2.7?"var(--r)":p.gpa>=3.5?"var(--g)":"var(--t1)"}}>
                  {editMode?<EditCell value={p.gpa} onChange={v=>updatePlayer(p.id,'gpa',v)} type="number" style={{width:44,fontFamily:"var(--ff-m)"}}/>:p.gpa}
                </span></td>
                <td><span style={{fontFamily:"var(--ff-m)",fontSize:12}}>
                  {editMode?<EditCell value={p.apps} onChange={v=>updatePlayer(p.id,'apps',v)} type="number" style={{width:36,fontFamily:"var(--ff-m)"}}/>:p.apps}
                </span></td>
                <td><span style={{fontFamily:"var(--ff-m)",fontSize:12,color:p.goals>10?"var(--g)":"var(--t2)",fontWeight:p.goals>10?700:400}}>
                  {editMode?<EditCell value={p.goals} onChange={v=>updatePlayer(p.id,'goals',v)} type="number" style={{width:36,fontFamily:"var(--ff-m)"}}/>:p.goals}
                </span></td>
                <td><span style={{fontFamily:"var(--ff-m)",fontSize:12,color:p.assists>5?"var(--b)":"var(--t2)",fontWeight:p.assists>5?700:400}}>
                  {editMode?<EditCell value={p.assists} onChange={v=>updatePlayer(p.id,'assists',v)} type="number" style={{width:36,fontFamily:"var(--ff-m)"}}/>:p.assists}
                </span></td>
                <td><span style={{fontFamily:"var(--ff-m)",fontSize:12,fontWeight:700,color:p.eq===1.0?"var(--g)":p.eq>=0.5?"var(--b)":p.eq>0?"var(--gold)":"var(--t3)"}}>
                  {editMode?<EditCell value={p.eq} onChange={v=>updatePlayer(p.id,'eq',v)} type="number" style={{width:50,fontFamily:"var(--ff-m)"}}/>:p.eq===0?"Walk-on":p.eq===1.0?"Full":`${(p.eq*100).toFixed(0)}%`}
                </span></td>
                <td><span style={{fontFamily:"var(--ff-m)",fontSize:12,color:"var(--t2)"}}>
                  {editMode?<EditCell value={p.aid} onChange={v=>updatePlayer(p.id,'aid',v)} type="number" style={{width:70,fontFamily:"var(--ff-m)"}}/>:p.aid>0?`$${p.aid.toLocaleString()}`:"—"}
                </span></td>
                <td>
                  {editMode?<EditCell value={p.elig} onChange={v=>updatePlayer(p.id,'elig',v)} style={{width:80}}/>
                    :<span className={`tag ${p.elig.includes("Last")?"tr":"td"}`} style={{fontSize:9}}>{p.elig}</span>}
                </td>
                <td style={{fontSize:11,color:"var(--t3)"}}>
                  {editMode?<EditCell value={p.major||""} onChange={v=>updatePlayer(p.id,'major',v)} style={{width:120,fontSize:11}}/>:p.major}
                </td>
                <td style={{fontSize:11,color:p.injury?"var(--r)":"var(--t3)",maxWidth:120,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                  {editMode?<EditCell value={p.injury||""} onChange={v=>updatePlayer(p.id,'injury',v||null)} style={{width:120,fontSize:11}}/>:p.injury||"—"}
                </td>
                {editMode&&<td>
                  <button onClick={()=>removePlayer(p.id)} style={{color:"var(--r)",fontSize:11,padding:"2px 8px",borderRadius:5,background:"rgba(255,68,68,.1)",border:"1px solid rgba(255,68,68,.2)",cursor:"pointer"}}>✕</button>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ============================================================
   MODULE: SCHOLARSHIP BUDGET (Cap tracker + Drag-to-Pitch builder)
   ============================================================ */

// 1-4-3-3 formation zones: [positionKey, label, x%, y%]
const FORMATION_433 = [
  { key:"GK",  label:"GK",  x:50, y:86 },
  { key:"RB",  label:"RB",  x:80, y:70 },
  { key:"CB1", label:"CB",  x:62, y:70 },
  { key:"CB2", label:"CB",  x:38, y:70 },
  { key:"LB",  label:"LB",  x:20, y:70 },
  { key:"CM1", label:"CM",  x:72, y:50 },
  { key:"CM2", label:"CM",  x:50, y:46 },
  { key:"CM3", label:"CM",  x:28, y:50 },
  { key:"RW",  label:"RW",  x:78, y:26 },
  { key:"ST",  label:"ST",  x:50, y:18 },
  { key:"LW",  label:"LW",  x:22, y:26 },
];

const ScholarshipMod = () => {
  const {roster, editMode} = useData();
  const eq = roster.reduce((a,p)=>a+p.eq, 0);
  const sorted = [...roster].sort((a,b)=>b.eq-a.eq);

  // Drag-to-pitch state: {positionKey -> player}
  const [placed, setPlaced] = useState({});
  const [dragging, setDragging] = useState(null); // player id being dragged
  const [dragOver, setDragOver] = useState(null); // position key hovered

  // Compute EQ of players on pitch
  const pitchEQ = Object.values(placed).reduce((a,p)=> p ? a+p.eq : a, 0);
  const pitchAid = Object.values(placed).reduce((a,p)=> p ? a+p.aid : a, 0);
  const remainingAfterPitch = 14.0 - pitchEQ;
  const capPct = Math.round((eq/14)*100);
  const pitchPct = Math.round((pitchEQ/14)*100);

  const handleDragStart = (e, player) => {
    setDragging(player);
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDragOver = (e, posKey) => {
    e.preventDefault();
    setDragOver(posKey);
  };
  const handleDrop = (e, posKey) => {
    e.preventDefault();
    if (dragging) {
      // Remove player from any other zone first
      const newPlaced = {...placed};
      Object.keys(newPlaced).forEach(k => {
        if (newPlaced[k]?.id === dragging.id) delete newPlaced[k];
      });
      newPlaced[posKey] = dragging;
      setPlaced(newPlaced);
    }
    setDragging(null);
    setDragOver(null);
  };
  const handleDragLeave = () => setDragOver(null);
  const removeFromPitch = (posKey) => {
    const np = {...placed};
    delete np[posKey];
    setPlaced(np);
  };
  const clearAll = () => setPlaced({});

  const placedIds = new Set(Object.values(placed).filter(Boolean).map(p=>p.id));

  return (
    <div style={{padding:"22px 26px",overflowY:"auto",height:"100%",display:"flex",flexDirection:"column",gap:16}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div className="section-h">Scholarship Budget</div>
          <div className="section-sub">NCAA Women's Soccer Cap: 14.0 EQ · Drag players onto the pitch to build scholarship scenarios</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn-ghost" style={{fontSize:12}} onClick={clearAll}>Clear Pitch</button>
          <button className="btn-gold" style={{fontSize:12}}>Export Report</button>
        </div>
      </div>

      {/* Top KPIs */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}>
        {[
          {lbl:"Total EQ Used",val:`${eq.toFixed(2)} / 14.0`,pct:capPct,color:"var(--gold)"},
          {lbl:"Remaining Cap",val:`${(14-eq).toFixed(2)} EQ`,pct:100-capPct,color:"var(--b)"},
          {lbl:"Pitch EQ Selected",val:pitchEQ.toFixed(2),pct:pitchPct,color:"var(--g)"},
          {lbl:"Pitch Aid $",val:`$${pitchAid.toLocaleString()}`,pct:Math.round((pitchAid/BUDGET.totalAid)*100)||0,color:"var(--o)"},
          {lbl:"Walk-ons",val:ROSTER.filter(p=>p.eq===0).length,pct:Math.round((ROSTER.filter(p=>p.eq===0).length/ROSTER.length)*100),color:"var(--t2)"},
        ].map((k,i)=>(
          <div key={i} className="kpi" style={{padding:"14px 16px"}}>
            <div className="kpi-lbl">{k.lbl}</div>
            <div className="kpi-val" style={{color:k.color,fontSize:22}}>{k.val}</div>
            <div className="pbar" style={{marginTop:8}}><div className="pfill" style={{width:`${k.pct}%`,background:k.color}}/></div>
          </div>
        ))}
      </div>

      {/* Main: Cap Tracker + Pitch Builder */}
      <div style={{display:"grid",gridTemplateColumns:"260px 1fr 200px",gap:14,flex:1,minHeight:0}}>

        {/* Left: Player pool (draggable) */}
        <div style={{display:"flex",flexDirection:"column",gap:0}}>
          <div style={{fontSize:10,fontWeight:700,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".8px",fontFamily:"var(--ff-c)",marginBottom:8,padding:"0 2px"}}>
            Player Pool — Drag to Pitch
          </div>
          <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:3}}>
            {sorted.map(p=>{
              const onPitch = placedIds.has(p.id);
              const eqColor = p.eq===1.0?"var(--g)":p.eq>=0.5?"var(--b)":p.eq>0?"var(--gold)":"var(--t3)";
              return (
                <div key={p.id}
                  draggable={!onPitch}
                  onDragStart={e=>!onPitch&&handleDragStart(e,p)}
                  style={{
                    display:"flex",alignItems:"center",gap:8,
                    padding:"7px 10px",borderRadius:8,
                    background: onPitch?"rgba(34,197,94,.07)":"var(--s2)",
                    border:`1px solid ${onPitch?"rgba(34,197,94,.25)":dragging?.id===p.id?"var(--gold)":"var(--bd)"}`,
                    cursor:onPitch?"default":"grab",
                    opacity:onPitch?.55:1,
                    transition:"all .15s",
                  }}>
                  <div style={{width:26,height:26,borderRadius:6,background:onPitch?"rgba(34,197,94,.2)":`${eqColor}18`,border:`1px solid ${onPitch?"var(--g)":eqColor}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{fontSize:8,fontWeight:700,color:onPitch?"var(--g)":eqColor,fontFamily:"var(--ff-c)"}}>{p.pos}</span>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:11,fontWeight:600,color:onPitch?"var(--t3)":"var(--t1)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.name}</div>
                    <div style={{fontSize:9,color:"var(--t3)",fontFamily:"var(--ff-m)"}}>{p.eq===0?"Walk-on":p.eq===1.0?"Full":`${(p.eq*100).toFixed(0)}%`} · {p.aid>0?`$${(p.aid/1000).toFixed(0)}K`:"—"}</div>
                  </div>
                  {onPitch&&<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--g)" strokeWidth="2.5" style={{flexShrink:0}}><polyline points="20 6 9 17 4 12"/></svg>}
                  {!onPitch&&<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--t3)" strokeWidth="2" style={{flexShrink:0,opacity:.5}}><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: Soccer pitch with drop zones */}
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {/* Live EQ meter */}
          <div style={{background:"var(--s2)",border:"1px solid var(--bdg)",borderRadius:10,padding:"10px 14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div style={{fontSize:11,fontWeight:700,color:"var(--t2)",fontFamily:"var(--ff-c)",textTransform:"uppercase",letterSpacing:".8px"}}>
                Pitch Scholarship Meter
              </div>
              <div style={{display:"flex",gap:14,fontSize:11}}>
                <span style={{color:"var(--t3)"}}>On Pitch: <span style={{fontFamily:"var(--ff-m)",color:"var(--gold)",fontWeight:700}}>{pitchEQ.toFixed(2)} EQ</span></span>
                <span style={{color:"var(--t3)"}}>Remaining: <span style={{fontFamily:"var(--ff-m)",color:remainingAfterPitch<0?"var(--r)":"var(--g)",fontWeight:700}}>{remainingAfterPitch.toFixed(2)} EQ</span></span>
                <span style={{color:"var(--t3)"}}>Aid: <span style={{fontFamily:"var(--ff-m)",color:"var(--gold)",fontWeight:700}}>${pitchAid.toLocaleString()}</span></span>
              </div>
            </div>
            {/* Stacked bar: total cap */}
            <div style={{height:12,background:"var(--s4)",borderRadius:6,overflow:"hidden",position:"relative"}}>
              <div style={{position:"absolute",left:0,top:0,bottom:0,width:`${capPct}%`,background:"linear-gradient(90deg,var(--s5),var(--s4))",transition:"width .4s"}}/>
              <div style={{position:"absolute",left:0,top:0,bottom:0,width:`${pitchPct}%`,background:"linear-gradient(90deg,var(--gold),var(--gold2))",borderRadius:6,transition:"width .4s ease",boxShadow:"0 0 12px rgba(255,184,28,.4)"}}/>
              {/* Cap line at 100% */}
              <div style={{position:"absolute",right:0,top:0,bottom:0,width:2,background:"var(--r)",opacity:.8}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:4,fontSize:9,color:"var(--t3)",fontFamily:"var(--ff-c)",textTransform:"uppercase",letterSpacing:".5px"}}>
              <span>0 EQ</span>
              <span style={{color:"var(--gold)"}}>Pitch: {pitchEQ.toFixed(2)}</span>
              <span style={{color:"var(--r)"}}>Cap: 14.0</span>
            </div>
          </div>

          {/* Pitch */}
          <div style={{flex:1,position:"relative",borderRadius:12,overflow:"hidden",border:"2px solid rgba(255,255,255,.07)",minHeight:420}}>
            {/* Pitch background */}
            <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center,#1e6b30 0%,#155225 40%,#0d3a1a 100%)"}}>
              <svg width="100%" height="100%" viewBox="0 0 500 560" style={{position:"absolute",inset:0}}>
                <rect x="20" y="20" width="460" height="520" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1.5"/>
                <line x1="20" y1="280" x2="480" y2="280" stroke="rgba(255,255,255,.2)" strokeWidth="1.5"/>
                <circle cx="250" cy="280" r="60" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1.5"/>
                <circle cx="250" cy="280" r="3" fill="rgba(255,255,255,.3)"/>
                <rect x="145" y="20" width="210" height="88" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="1.5"/>
                <rect x="190" y="20" width="120" height="44" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="1.5"/>
                <rect x="145" y="452" width="210" height="88" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="1.5"/>
                <rect x="190" y="496" width="120" height="44" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="1.5"/>
                <circle cx="250" cy="148" r="4" fill="rgba(255,255,255,.3)"/>
                <circle cx="250" cy="412" r="4" fill="rgba(255,255,255,.3)"/>
                {[0,1,2,3,4].map(i=><rect key={i} x="20" y={20+i*104} width="460" height="52" fill={i%2===0?"rgba(255,255,255,.012)":"transparent"}/>)}
                {/* Formation label */}
                <text x="250" y="552" textAnchor="middle" fill="rgba(255,255,255,.25)" fontSize="11" fontFamily="'Barlow Condensed',sans-serif" letterSpacing="3">1-4-3-3</text>
              </svg>
            </div>

            {/* Drop zones */}
            {FORMATION_433.map(zone=>{
              const player = placed[zone.key];
              const isOver = dragOver===zone.key;
              const eqColor = player ? (player.eq===1.0?"#22C55E":player.eq>=0.5?"#3D8EFF":player.eq>0?"var(--gold)":"#888") : "rgba(255,255,255,.3)";
              return (
                <div key={zone.key}
                  onDragOver={e=>handleDragOver(e,zone.key)}
                  onDrop={e=>handleDrop(e,zone.key)}
                  onDragLeave={handleDragLeave}
                  onClick={()=>player&&removeFromPitch(zone.key)}
                  style={{
                    position:"absolute",
                    left:`${zone.x}%`, top:`${zone.y}%`,
                    transform:"translate(-50%,-50%)",
                    width:player?64:50, height:player?64:50,
                    borderRadius:"50%",
                    background: player
                      ? `radial-gradient(circle,${eqColor}CC,${eqColor}88)`
                      : isOver
                        ? "rgba(255,184,28,.35)"
                        : "rgba(0,0,0,.35)",
                    border:`2px solid ${player?eqColor:isOver?"var(--gold)":"rgba(255,255,255,.25)"}`,
                    display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                    cursor:player?"pointer":"default",
                    transition:"all .2s ease",
                    zIndex:2,
                    boxShadow: player?`0 0 20px ${eqColor}55`:isOver?"0 0 18px rgba(255,184,28,.4)":"none",
                  }}>
                  {player ? (
                    <>
                      <div style={{fontSize:8,fontWeight:700,color:"#000",fontFamily:"var(--ff-c)",letterSpacing:.3,lineHeight:1.1,textAlign:"center",textShadow:"none"}}>
                        #{player.jersey}
                      </div>
                      <div style={{fontSize:7,fontWeight:700,color:"rgba(0,0,0,.85)",fontFamily:"var(--ff-c)",whiteSpace:"nowrap",overflow:"hidden",maxWidth:58,textOverflow:"ellipsis",textAlign:"center"}}>
                        {player.name.split(" ")[1]?.substring(0,7)||player.name.substring(0,7)}
                      </div>
                      <div style={{fontSize:7,color:"rgba(0,0,0,.7)",fontFamily:"var(--ff-m)",marginTop:1}}>
                        {player.eq===0?"WO":player.eq===1?"Full":`${(player.eq*100).toFixed(0)}%`}
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{fontSize:10,fontWeight:700,color:isOver?"var(--gold)":"rgba(255,255,255,.5)",fontFamily:"var(--ff-c)",letterSpacing:.5}}>{zone.label}</div>
                      <div style={{fontSize:8,color:isOver?"var(--gold)":"rgba(255,255,255,.25)",marginTop:2}}>drop</div>
                    </>
                  )}
                </div>
              );
            })}

            {/* Summary badge bottom-left */}
            <div style={{position:"absolute",bottom:12,left:12,background:"rgba(0,0,0,.75)",backdropFilter:"blur(8px)",borderRadius:8,padding:"7px 12px",border:"1px solid rgba(255,184,28,.25)",zIndex:3}}>
              <div style={{fontSize:9,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".8px",fontFamily:"var(--ff-c)",marginBottom:3}}>Starters on Pitch</div>
              <div style={{fontFamily:"var(--ff-m)",fontSize:16,color:"var(--gold)",fontWeight:700,lineHeight:1}}>{Object.keys(placed).length} / 11</div>
              <div style={{fontSize:9,color:"var(--t3)",marginTop:2}}>Click player to remove</div>
            </div>
          </div>
        </div>

        {/* Right: Cap tracker bar chart */}
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <div style={{fontSize:10,fontWeight:700,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".8px",fontFamily:"var(--ff-c)",marginBottom:4}}>
            Full Cap Tracker
          </div>
          {/* Global cap bar */}
          <div style={{background:"var(--s2)",border:"1px solid var(--bdg)",borderRadius:8,padding:"8px 10px",marginBottom:6}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:4}}>
              <span style={{fontFamily:"var(--ff-m)",color:"var(--gold)",fontWeight:700}}>{eq.toFixed(2)} EQ</span>
              <span style={{color:"var(--t3)"}}>/ 14.0</span>
            </div>
            <div style={{height:8,background:"var(--s4)",borderRadius:4,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${capPct}%`,background:"linear-gradient(90deg,var(--gold),var(--gold2))",borderRadius:4}}/>
            </div>
          </div>
          <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:2}}>
            {sorted.map(p=>{
              const c=p.eq===1.0?"#22C55E":p.eq>=0.5?"#3D8EFF":p.eq>0?"var(--gold)":"#546078";
              const onPitch = placedIds.has(p.id);
              return (
                <div key={p.id} style={{display:"flex",alignItems:"center",gap:5}}>
                  <div style={{width:72,fontSize:9,color:onPitch?"var(--g)":"var(--t2)",textAlign:"right",fontFamily:"var(--ff-c)",flexShrink:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:onPitch?700:400}}>
                    {p.name.split(" ")[1]?.substring(0,8)||p.name.substring(0,8)}
                  </div>
                  <div style={{flex:1,height:16,background:"var(--s3)",borderRadius:2,position:"relative",overflow:"hidden",border:onPitch?`1px solid ${c}55`:undefined}}>
                    {p.eq>0&&(
                      <div style={{position:"absolute",left:0,top:0,bottom:0,width:`${p.eq*100}%`,background:c,borderRadius:2,display:"flex",alignItems:"center",paddingLeft:4,transition:"width .5s ease"}}>
                        <span style={{fontSize:8,fontWeight:700,color:"#000",fontFamily:"var(--ff-m)"}}>{p.eq.toFixed(2)}</span>
                      </div>
                    )}
                    {p.eq===0&&<div style={{position:"absolute",left:3,top:0,bottom:0,display:"flex",alignItems:"center"}}><span style={{fontSize:8,color:"var(--t3)"}}>WO</span></div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom: AI scholarship insights */}
      <AIPanel context="scholarship"/>
    </div>
  );
};

/* ============================================================
   MODULE: PROGRAM BUDGET (Separate P&L)
   ============================================================ */
const ProgramBudgetMod = () => {
  const rev = BUDGET.revenue.reduce((a,r)=>a+r.amt,0);
  const exp = BUDGET.expenses.reduce((a,e)=>a+e.amt,0);
  const net = rev - exp;
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div style={{padding:"22px 26px",overflowY:"auto",height:"100%",display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div className="section-h">Program Budget</div>
          <div className="section-sub">Fiscal Year 2024–25 · Revenue · Expenses · P&L</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn-ghost" style={{fontSize:12}}>Export P&L</button>
          <button className="btn-gold" style={{fontSize:12}}>Submit to AD</button>
        </div>
      </div>

      {/* Tab switcher */}
      <div style={{display:"flex",background:"var(--s2)",border:"1px solid var(--bd)",borderRadius:9,overflow:"hidden",width:"fit-content"}}>
        {["overview","revenue","expenses","forecast"].map(t=>(
          <button key={t} onClick={()=>setActiveTab(t)}
            style={{padding:"7px 16px",fontSize:12,fontWeight:700,fontFamily:"var(--ff-c)",letterSpacing:".5px",textTransform:"uppercase",
              background:activeTab===t?"var(--gold)":"transparent",color:activeTab===t?"#000":"var(--t3)",border:"none",cursor:"pointer",transition:"all .15s"}}>
            {t}
          </button>
        ))}
      </div>

      {activeTab==="overview"&&(
        <>
          {/* Summary KPIs */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
            {[
              {lbl:"Total Revenue",val:`$${(rev/1000000).toFixed(3)}M`,sub:"All sources",color:"var(--g)",pct:100},
              {lbl:"Total Expenses",val:`$${(exp/1000000).toFixed(3)}M`,sub:`${Math.round((exp/rev)*100)}% of revenue`,color:"var(--r)",pct:Math.round((exp/rev)*100)},
              {lbl:"Net Surplus",val:`+$${((net)/1000).toFixed(1)}K`,sub:"Before capital",color:"var(--gold)",pct:Math.round((net/rev)*100)},
              {lbl:"Budget Utilization",val:`${Math.round((exp/rev)*100)}%`,sub:"Expenses vs Revenue",color:"var(--b)",pct:Math.round((exp/rev)*100)},
            ].map((k,i)=>(
              <div key={i} className="kpi">
                <div className="kpi-lbl">{k.lbl}</div>
                <div className="kpi-val" style={{color:k.color,fontSize:24}}>{k.val}</div>
                <div className="kpi-sub">{k.sub}</div>
                <div className="pbar" style={{marginTop:8}}><div className="pfill" style={{width:`${k.pct}%`,background:k.color}}/></div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div className="card">
              <div style={{fontSize:12,fontWeight:700,color:"var(--t1)",fontFamily:"var(--ff-c)",textTransform:"uppercase",letterSpacing:".8px",marginBottom:14}}>Revenue Breakdown</div>
              {BUDGET.revenue.map((r,i)=>{
                const pct=Math.round((r.amt/rev)*100);
                return (
                  <div key={i} style={{marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                      <span style={{color:"var(--t2)"}}>{r.src}</span>
                      <div style={{display:"flex",gap:8,alignItems:"center"}}>
                        <span style={{fontSize:10,color:"var(--t3)"}}>{pct}%</span>
                        <span style={{fontFamily:"var(--ff-m)",color:"var(--g)",fontWeight:600,fontSize:12}}>${r.amt.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="pbar" style={{height:6}}>
                      <div className="pfill" style={{width:`${pct}%`,background:"var(--g)"}}/>
                    </div>
                  </div>
                );
              })}
              <div style={{display:"flex",justifyContent:"space-between",paddingTop:10,borderTop:"1px solid var(--bd)",marginTop:4}}>
                <span style={{fontSize:13,fontWeight:700,color:"var(--t1)"}}>Total Revenue</span>
                <span style={{fontFamily:"var(--ff-m)",fontSize:14,color:"var(--g)",fontWeight:700}}>${rev.toLocaleString()}</span>
              </div>
            </div>
            <div className="card">
              <div style={{fontSize:12,fontWeight:700,color:"var(--t1)",fontFamily:"var(--ff-c)",textTransform:"uppercase",letterSpacing:".8px",marginBottom:14}}>Expenses vs Budget</div>
              {BUDGET.expenses.map((e,i)=>{
                const util=e.amt/e.budget;
                const color=util>0.97?"var(--r)":util>0.85?"var(--gold)":"var(--g)";
                return (
                  <div key={i} style={{marginBottom:9}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:3}}>
                      <span style={{color:"var(--t2)"}}>{e.cat}</span>
                      <div style={{display:"flex",gap:6}}>
                        <span style={{fontFamily:"var(--ff-m)",color}}>${(e.amt/1000).toFixed(0)}K</span>
                        <span style={{color:"var(--t3)"}}>/ ${(e.budget/1000).toFixed(0)}K</span>
                      </div>
                    </div>
                    <div className="pbar" style={{height:5}}>
                      <div className="pfill" style={{width:`${Math.min(util*100,100)}%`,background:color}}/>
                    </div>
                  </div>
                );
              })}
              <div style={{display:"flex",justifyContent:"space-between",paddingTop:10,borderTop:"1px solid var(--bd)",marginTop:4,padding:"10px 10px 0"}}>
                <span style={{fontSize:13,fontWeight:700,color:"var(--t1)"}}>Net Surplus</span>
                <span style={{fontFamily:"var(--ff-m)",fontSize:14,color:"var(--g)",fontWeight:700}}>+${net.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab==="revenue"&&(
        <div className="card" style={{padding:0,overflow:"hidden"}}>
          <table className="dt">
            <thead><tr><th>Revenue Source</th><th>FY24-25 Actual</th><th>FY23-24</th><th>Change</th><th>% of Total</th></tr></thead>
            <tbody>{BUDGET.revenue.map((r,i)=>{
              const prev=Math.round(r.amt*(.85+Math.random()*.2));
              const chg=r.amt-prev;
              return (
                <tr key={i}>
                  <td className="hl">{r.src}</td>
                  <td><span style={{fontFamily:"var(--ff-m)",fontSize:13,color:"var(--g)",fontWeight:600}}>${r.amt.toLocaleString()}</span></td>
                  <td><span style={{fontFamily:"var(--ff-m)",fontSize:12,color:"var(--t3)"}}>${prev.toLocaleString()}</span></td>
                  <td><span style={{fontFamily:"var(--ff-m)",fontSize:12,color:chg>0?"var(--g)":"var(--r)",fontWeight:600}}>{chg>0?"+":""}{chg.toLocaleString()}</span></td>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <div className="pbar" style={{width:60,height:5}}><div className="pfill" style={{width:`${Math.round((r.amt/rev)*100)}%`,background:"var(--g)"}}/></div>
                      <span style={{fontFamily:"var(--ff-m)",fontSize:11,color:"var(--t3)"}}>{Math.round((r.amt/rev)*100)}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}</tbody>
          </table>
        </div>
      )}

      {activeTab==="expenses"&&(
        <div className="card" style={{padding:0,overflow:"hidden"}}>
          <table className="dt">
            <thead><tr><th>Category</th><th>Budget</th><th>Actual</th><th>Variance</th><th>Utilization</th></tr></thead>
            <tbody>{BUDGET.expenses.map((e,i)=>{
              const variance=e.budget-e.amt;
              const util=Math.round((e.amt/e.budget)*100);
              return (
                <tr key={i}>
                  <td className="hl">{e.cat}</td>
                  <td><span style={{fontFamily:"var(--ff-m)",fontSize:12,color:"var(--t2)"}}>${e.budget.toLocaleString()}</span></td>
                  <td><span style={{fontFamily:"var(--ff-m)",fontSize:13,color:util>95?"var(--r)":"var(--t1)",fontWeight:600}}>${e.amt.toLocaleString()}</span></td>
                  <td><span style={{fontFamily:"var(--ff-m)",fontSize:12,color:variance>0?"var(--g)":"var(--r)",fontWeight:600}}>{variance>0?"+":""}{variance.toLocaleString()}</span></td>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <div className="pbar" style={{width:70,height:5}}><div className="pfill" style={{width:`${Math.min(util,100)}%`,background:util>95?"var(--r)":util>80?"var(--gold)":"var(--g)"}}/></div>
                      <span style={{fontFamily:"var(--ff-m)",fontSize:11,color:util>95?"var(--r)":util>80?"var(--gold)":"var(--g)",fontWeight:600}}>{util}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}</tbody>
          </table>
        </div>
      )}

      {activeTab==="forecast"&&(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          {["FY25-26 Revenue Projection","FY25-26 Expense Forecast"].map((title,col)=>(
            <div key={title} className="card">
              <div style={{fontSize:12,fontWeight:700,color:"var(--t1)",fontFamily:"var(--ff-c)",textTransform:"uppercase",letterSpacing:".8px",marginBottom:12}}>{title}</div>
              {(col===0?BUDGET.revenue:BUDGET.expenses).map((item,i)=>{
                const base=col===0?item.amt:item.budget;
                const forecast=Math.round(base*1.04);
                return (
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:"1px solid var(--bd)"}}>
                    <span style={{fontSize:11,color:"var(--t2)"}}>{col===0?item.src:item.cat}</span>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <span style={{fontSize:10,color:"var(--t3)",fontFamily:"var(--ff-m)"}}>${(base/1000).toFixed(0)}K</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><polyline points="5 12 12 5 19 12"/></svg>
                      <span style={{fontFamily:"var(--ff-m)",fontSize:11,color:"var(--gold)",fontWeight:600}}>${(forecast/1000).toFixed(0)}K</span>
                    </div>
                  </div>
                );
              })}
              <div style={{marginTop:10,padding:"8px 10px",background:"rgba(255,184,28,.06)",borderRadius:7,fontSize:11,color:"var(--gold)",fontFamily:"var(--ff-c)",fontWeight:600,textTransform:"uppercase",letterSpacing:".5px"}}>
                Assumes +4% growth projection
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ============================================================
   AI SCHOLARSHIP AGENT — multi-turn chat with full program context
   ============================================================ */
const AGENT_SYSTEM = () => {
  const eq = ROSTER.reduce((a,p)=>a+p.eq,0);
  const remaining = (14.0 - eq).toFixed(2);
  const seniors = ROSTER.filter(p=>p.elig.includes("Last")).map(p=>`${p.name} (${p.pos}, ${p.eq} EQ)`).join(", ");
  const atRisk = ROSTER.filter(p=>p.gpa<2.7).map(p=>p.name).join(", ");
  const posCount = {};
  ROSTER.forEach(p=>{ posCount[p.pos]=(posCount[p.pos]||0)+1; });
  const pitchNeeds = ["LB","RB","GK","ST","LW","RW","CDM"].filter(pos=>(posCount[pos]||0)<=1);

  return `You are the Pitt Women's Soccer AI Scholarship Scenario Advisor — an elite NCAA recruiting strategist embedded in the "Forged in Steel" command center.

## YOUR ROLE
You help Coach Taylor Morrison craft scholarship offers and recruiting scenarios. You think like a D1 recruiting coordinator: tactically aware, budget-conscious, academically mindful, and relationship-savvy.

## CURRENT PROGRAM STATE (live data)
- **School:** University of Pittsburgh, ACC, NCAA D1
- **Tactical System:** 1-4-3-3 pressing system (Coach Chen, Technical Director)
  - Requires: athletic FB who can invert, box-to-box CM3 with engine, technical wingers who cut inside, clinical ST who leads press
- **Scholarship Cap:** 14.0 EQ (NCAA Women's Soccer)
- **Currently Used:** ${eq.toFixed(2)} EQ (${Math.round((eq/14)*100)}% of cap)
- **Remaining Cap:** ${remaining} EQ
- **Total Aid Committed:** $${BUDGET.totalAid.toLocaleString()}

## DEPARTING SENIORS (freeing EQ after this season)
${seniors}
Total EQ freeing up: ${ROSTER.filter(p=>p.elig.includes("Last")).reduce((a,p)=>a+p.eq,0).toFixed(2)} EQ

## CURRENT POSITIONAL DEPTH (thinly covered)
${pitchNeeds.map(p=>`- ${p}: only ${posCount[p]||0} player(s) — PRIORITY NEED`).join("\n")}

## CURRENT RECRUITS IN PIPELINE
${RECRUITS.map(r=>`- ${r.name} | ${r.pos} | ${r.state} | Rating: ${r.rating}/5 | GPA: ${r.gpa} | Status: ${r.status} | Current offer: ${r.offer} | Priority: ${r.priority}\n  Notes: ${r.notes}`).join("\n")}

## TRANSFER PORTAL TARGETS
${TRANSFER_PORTAL.filter(t=>t.status!=="Passed").map(t=>`- ${t.name} | ${t.pos} | From: ${t.prev} | GPA: ${t.gpa} | Rating: ${t.rating} | Status: ${t.status}`).join("\n")}

## TACTICAL CONTEXT — 1-4-3-3 POSITIONAL PROFILES
- **GK:** Sweeper-keeper, comfortable with feet, high line
- **RB/LB:** High-energy fullbacks who can invert into CM role in build-up; must have stamina (high player load tolerance)
- **CB:** Left-footed CB on left, dominant header on right; physical and calm under pressure
- **CM3 (base):** Double pivot anchor; wins second balls, protects back 4; high defensive work rate
- **CM1/CM2 (box-to-box):** Engine players — 8+ km per match; carry ball from deep; 4-7 goal contributions
- **LW/RW:** Technical wingers who cut inside onto strong foot; 8+ progressive carries per match
- **ST:** Press leader, clinical finisher, 12+ goals per season; must win duels and hold up play

## SCHOLARSHIP STRATEGY GUIDELINES
- Full scholarships (1.0 EQ = ~$56K/yr) for Tier 1 positional needs + 4.5+ rated players
- Partial (0.75-0.87 EQ) for depth pieces and 4.0-4.4 rated recruits
- 0.25-0.5 EQ walk-on bumps for academic/culture fits with upside
- Never exceed 14.0 EQ total
- Stack priority positions: never go into a season with <2 at GK, CB, or ST
- Academic eligibility: Pitt requires 2.5+ GPA for eligibility — flag any recruit below 2.8

## YOUR PERSONALITY
You are direct, tactical, and data-driven. You cite specific EQ numbers, dollar figures, and tactical fit reasoning in every recommendation. You ask clarifying questions when needed. You think in scenarios: "If you sign X at Y EQ, then for recruit Z you have W remaining." You flag risks.`;
};

const ScholarshipAgent = ({ selectedRecruit }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]); // API message history
  const chatRef = useRef(null);

  // Auto-inject selected recruit context
  useEffect(() => {
    if (selectedRecruit) {
      const intro = `I'm looking at **${selectedRecruit.name}** — ${selectedRecruit.pos} from ${selectedRecruit.state}, rated ${selectedRecruit.rating}/5, GPA ${selectedRecruit.gpa}. Current offer: ${selectedRecruit.offer}. ${selectedRecruit.notes} What scholarship scenario would you recommend?`;
      setInput(intro);
    }
  }, [selectedRecruit]);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, loading]);

  // Seed greeting on mount
  useEffect(() => {
    setMessages([{
      role: "assistant",
      content: "**Scholarship Scenario Advisor** ready. I have full access to your cap data, roster, tactical system, and pipeline.\n\nTry asking:\n- *\"What can we offer Jess Kowalski given our cap situation?\"*\n- *\"Walk me through our biggest positional gaps for next season\"*\n- *\"If we sign Caldwell + Kowalski at full rides, what's left for a transfer portal CB?\"*\n- *\"Which recruits fit our 1-4-3-3 profile best?\"*"
    }]);
  }, []);

  const send = async () => {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput("");

    const userMsg = { role:"user", content: msg };
    const newHistory = [...history, { role:"user", content: msg }];

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: AGENT_SYSTEM(),
          messages: newHistory
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "I couldn't generate a response.";
      setHistory([...newHistory, { role:"assistant", content: reply }]);
      setMessages(prev => [...prev, { role:"assistant", content: reply }]);
    } catch(e) {
      setMessages(prev => [...prev, { role:"assistant", content: "Connection error. Please try again." }]);
    }
    setLoading(false);
  };

  const QUICK_PROMPTS = [
    "What's our biggest positional need for next year?",
    "Full cap analysis — what can we offer?",
    "Compare Kowalski vs Cruz for our 4-3-3",
    "Portal + recruiting combo scenario",
    "Flag any academic risk recruits",
  ];

  const renderMsg = (text) => {
    // Simple markdown-lite: bold, line breaks, bullet points
    return text.split("\n").map((line, i) => {
      const boldLine = line.replace(/\*\*(.*?)\*\*/g, (_, t) => `<strong style="color:var(--t1)">${t}</strong>`);
      const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("• ");
      return (
        <div key={i} style={{
          marginBottom: isBullet ? 3 : line === "" ? 8 : 3,
          paddingLeft: isBullet ? 12 : 0,
          position: "relative",
          fontSize: 12,
          lineHeight: 1.6,
          color: "var(--t2)"
        }}>
          {isBullet && <span style={{position:"absolute",left:0,color:"var(--gold)",fontWeight:700}}>·</span>}
          <span dangerouslySetInnerHTML={{__html: boldLine}}/>
        </div>
      );
    });
  };

  return (
    <div style={{
      display:"flex", flexDirection:"column", height:"100%",
      background:"linear-gradient(135deg,rgba(0,53,148,.12),rgba(255,184,28,.05))",
      border:"1px solid rgba(255,184,28,.2)", borderRadius:12, overflow:"hidden"
    }}>
      {/* Agent header */}
      <div style={{padding:"12px 16px", borderBottom:"1px solid rgba(255,184,28,.15)", background:"rgba(0,0,0,.2)", flexShrink:0}}>
        <div style={{display:"flex", alignItems:"center", gap:10}}>
          <div style={{width:36,height:36,borderRadius:9,background:"linear-gradient(135deg,var(--navy),var(--gold2))",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 0 16px rgba(255,184,28,.3)"}}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:700,color:"var(--t1)"}}>AI Scholarship Scenario Advisor</div>
            <div style={{fontSize:10,color:"var(--gold)",fontFamily:"var(--ff-c)",letterSpacing:".5px"}}>TACTICAL · CAP-AWARE · PITT-SPECIFIC</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:5,background:"rgba(34,197,94,.1)",border:"1px solid rgba(34,197,94,.2)",borderRadius:20,padding:"3px 9px"}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"var(--g)"}} className="pulse"/>
            <span style={{fontSize:10,color:"var(--g)",fontWeight:600}}>Live</span>
          </div>
        </div>
        {/* Cap snapshot */}
        <div style={{display:"flex",gap:12,marginTop:10,padding:"7px 10px",background:"rgba(0,0,0,.2)",borderRadius:7}}>
          {[
            ["Cap Used", `${ROSTER.reduce((a,p)=>a+p.eq,0).toFixed(2)} / 14.0 EQ`, "var(--gold)"],
            ["Remaining", `${(14-ROSTER.reduce((a,p)=>a+p.eq,0)).toFixed(2)} EQ`, "var(--g)"],
            ["Seniors Out", `${ROSTER.filter(p=>p.elig.includes("Last")).reduce((a,p)=>a+p.eq,0).toFixed(2)} EQ freeing`, "var(--b)"],
            ["Priority Needs", ["LB","GK","ST"].join(" · "), "var(--r)"],
          ].map(([l,v,c])=>(
            <div key={l} style={{flex:1}}>
              <div style={{fontSize:9,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".5px",fontFamily:"var(--ff-c)",marginBottom:2}}>{l}</div>
              <div style={{fontSize:10,fontWeight:700,color:c,fontFamily:"var(--ff-m)"}}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick prompts */}
      <div style={{padding:"8px 12px",borderBottom:"1px solid var(--bd)",background:"rgba(0,0,0,.1)",flexShrink:0,display:"flex",gap:6,flexWrap:"wrap"}}>
        {QUICK_PROMPTS.map((p,i)=>(
          <button key={i} onClick={()=>setInput(p)}
            style={{fontSize:10,fontFamily:"var(--ff-c)",fontWeight:600,letterSpacing:".3px",padding:"4px 10px",borderRadius:20,background:"var(--s3)",border:"1px solid var(--bd2)",color:"var(--t3)",cursor:"pointer",whiteSpace:"nowrap",transition:"all .12s"}}
            onMouseEnter={e=>e.target.style.color="var(--gold)"}
            onMouseLeave={e=>e.target.style.color="var(--t3)"}
          >{p}</button>
        ))}
      </div>

      {/* Chat messages */}
      <div ref={chatRef} style={{flex:1,overflowY:"auto",padding:"14px 16px",display:"flex",flexDirection:"column",gap:12}}>
        {messages.map((m,i)=>(
          <div key={i} className="fade-in" style={{display:"flex",gap:10,flexDirection:m.role==="user"?"row-reverse":"row"}}>
            <div style={{
              width:28, height:28, borderRadius:7, flexShrink:0,
              background: m.role==="user" ? "var(--navy)" : "linear-gradient(135deg,var(--navy),var(--gold2))",
              border: m.role==="user" ? "1px solid rgba(61,142,255,.3)" : "1px solid rgba(255,184,28,.3)",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              {m.role==="user"
                ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--b)" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              }
            </div>
            <div style={{
              maxWidth:"82%",
              padding:"10px 13px",
              borderRadius: m.role==="user" ? "12px 4px 12px 12px" : "4px 12px 12px 12px",
              background: m.role==="user" ? "rgba(0,53,148,.3)" : "rgba(255,255,255,.04)",
              border: m.role==="user" ? "1px solid rgba(61,142,255,.2)" : "1px solid var(--bd)",
            }}>
              {renderMsg(m.content)}
            </div>
          </div>
        ))}
        {loading&&(
          <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
            <div style={{width:28,height:28,borderRadius:7,background:"linear-gradient(135deg,var(--navy),var(--gold2))",border:"1px solid rgba(255,184,28,.3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </div>
            <div style={{padding:"12px 16px",background:"rgba(255,255,255,.04)",border:"1px solid var(--bd)",borderRadius:"4px 12px 12px 12px",display:"flex",gap:6,alignItems:"center"}}>
              {[0,1,2].map(i=>(
                <div key={i} style={{width:6,height:6,borderRadius:"50%",background:"var(--gold)",animation:`pulse ${.8+i*.15}s ease-in-out infinite`,animationDelay:`${i*.15}s`}}/>
              ))}
              <span style={{fontSize:11,color:"var(--t3)",marginLeft:4}}>Analyzing cap & tactics…</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{padding:"10px 12px",borderTop:"1px solid var(--bd)",background:"rgba(0,0,0,.2)",flexShrink:0}}>
        <div style={{display:"flex",gap:8,alignItems:"flex-end"}}>
          <textarea
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
            placeholder="Ask about scholarship scenarios, positional needs, cap analysis, recruit fit…"
            rows={2}
            style={{
              flex:1, background:"var(--s2)", border:"1px solid var(--bd2)", borderRadius:9,
              padding:"9px 12px", color:"var(--t1)", fontSize:12, outline:"none",
              resize:"none", lineHeight:1.5, fontFamily:"var(--ff-b)"
            }}
          />
          <button onClick={send} disabled={loading||!input.trim()}
            className="btn-gold"
            style={{padding:"9px 16px",fontSize:13,opacity:loading||!input.trim()?.0:1,flexShrink:0,alignSelf:"stretch",borderRadius:9}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
        <div style={{fontSize:9,color:"var(--t3)",marginTop:5,fontFamily:"var(--ff-c)",letterSpacing:".3px"}}>ENTER to send · SHIFT+ENTER for new line · Full cap + roster context injected automatically</div>
      </div>
    </div>
  );
};

/* ============================================================
   MODULE: RECRUITING (Pipeline + AI Agent)
   ============================================================ */
const RecruitMod = () => {
  const [sel, setSel] = useState(null);
  const [activeTab, setActiveTab] = useState("pipeline");
  const stages = ["Verbal Commit","Offer Extended","Visit Scheduled","Soft Offer","Interested","Scouting"];
  const sc = {"Verbal Commit":"var(--g)","Offer Extended":"var(--b)","Visit Scheduled":"var(--b)","Soft Offer":"var(--gold)","Interested":"var(--o)","Scouting":"var(--t3)"};

  return (
    <div style={{padding:"22px 26px",height:"100%",display:"flex",flexDirection:"column",gap:14,overflow:"hidden"}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <div>
          <div className="section-h">Recruiting Pipeline</div>
          <div className="section-sub">{RECRUITS.length} Prospects · {RECRUITS.filter(r=>r.status==="Verbal Commit").length} Committed · {RECRUITS.filter(r=>r.status==="Offer Extended").length} Offers Out</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <div style={{display:"flex",background:"var(--s2)",border:"1px solid var(--bd)",borderRadius:9,overflow:"hidden"}}>
            {["pipeline","agent"].map(t=>(
              <button key={t} onClick={()=>setActiveTab(t)}
                style={{padding:"7px 16px",fontSize:12,fontWeight:700,fontFamily:"var(--ff-c)",letterSpacing:".5px",textTransform:"uppercase",
                  background:activeTab===t?(t==="agent"?"var(--gold)":"var(--navy)"):"transparent",
                  color:activeTab===t?(t==="agent"?"#000":"#fff"):"var(--t3)",border:"none",cursor:"pointer",transition:"all .15s",display:"flex",alignItems:"center",gap:6}}>
                {t==="agent"&&<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>}
                {t==="pipeline"?"Pipeline":"AI Advisor"}
              </button>
            ))}
          </div>
          <button className="btn-gold" style={{fontSize:12}}>+ Add Prospect</button>
        </div>
      </div>

      {activeTab==="pipeline" && (
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:14,overflow:"hidden"}}>
          {/* Kanban */}
          <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4,flexShrink:0}}>
            {stages.map(stage=>{
              const ps=RECRUITS.filter(r=>r.status===stage);
              return (
                <div key={stage} style={{minWidth:168,background:"var(--s2)",border:`1px solid ${ps.length>0?sc[stage]+"30":"var(--bd)"}`,borderRadius:10,padding:10,flexShrink:0}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                    <div style={{fontSize:10,fontWeight:700,color:sc[stage],textTransform:"uppercase",letterSpacing:".5px",fontFamily:"var(--ff-c)"}}>{stage}</div>
                    <span style={{background:`${sc[stage]}20`,color:sc[stage],borderRadius:10,padding:"1px 7px",fontSize:11,fontWeight:700}}>{ps.length}</span>
                  </div>
                  {ps.map(p=>(
                    <div key={p.id} onClick={()=>setSel(sel?.id===p.id?null:p)}
                      style={{background:"var(--s3)",borderRadius:7,padding:"9px 10px",marginBottom:6,cursor:"pointer",
                        border:`1px solid ${sel?.id===p.id?"var(--gold)":"transparent"}`,transition:"all .12s"}}>
                      <div style={{fontSize:12,fontWeight:700,color:"var(--t1)",marginBottom:3}}>{p.name}</div>
                      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:5}}>
                        <span className="tag td" style={{fontSize:9}}>{p.pos}</span>
                        <span className="tag td" style={{fontSize:9}}>{p.state}</span>
                      </div>
                      <Stars v={p.rating}/>
                      <div style={{fontSize:10,color:p.offer==="Full"?"var(--g)":p.offer==="TBD"?"var(--t3)":"var(--b)",marginTop:4,fontWeight:600}}>{p.offer} Scholarship</div>
                    </div>
                  ))}
                  {ps.length===0&&<div style={{fontSize:10,color:"var(--t3)",textAlign:"center",padding:"10px 0"}}>Empty</div>}
                </div>
              );
            })}
          </div>

          {/* Detail + Agent trigger */}
          <div style={{flex:1,display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,minHeight:0,overflow:"hidden"}}>
            {sel ? (
              <div className="card fade-in" style={{overflowY:"auto"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                  <div>
                    <div style={{fontFamily:"var(--ff-h)",fontSize:22,letterSpacing:1}}>{sel.name}</div>
                    <div style={{fontSize:11,color:"var(--t3)"}}>{sel.club} · {sel.state} · Class of {sel.gradYr}</div>
                  </div>
                  <Stars v={sel.rating}/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
                  {[["Position",sel.pos],["GPA",sel.gpa],["Offer",sel.offer],["Priority",sel.priority],["Status",sel.status],["Contacts",sel.contacts]].map(([l,v])=>(
                    <div key={l} style={{background:"var(--s3)",borderRadius:7,padding:"7px 9px"}}>
                      <div style={{fontSize:9,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".5px",marginBottom:2}}>{l}</div>
                      <div style={{fontSize:12,fontWeight:600,color:"var(--t1)"}}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{background:"var(--s3)",borderRadius:7,padding:"9px 11px",marginBottom:11}}>
                  <div style={{fontSize:9,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".5px",marginBottom:3}}>Coach Notes</div>
                  <div style={{fontSize:12,color:"var(--t2)",lineHeight:1.5}}>{sel.notes}</div>
                </div>
                <div style={{display:"flex",gap:8,marginBottom:8}}>
                  <button className="btn-gold" style={{flex:1,fontSize:12,justifyContent:"center"}}>Log Contact</button>
                  <button className="btn-ghost" style={{flex:1,fontSize:12,justifyContent:"center"}}>Edit Record</button>
                </div>
                <button
                  onClick={()=>setActiveTab("agent")}
                  style={{width:"100%",padding:"9px",borderRadius:8,background:"linear-gradient(135deg,rgba(0,53,148,.3),rgba(255,184,28,.1))",border:"1px solid rgba(255,184,28,.25)",color:"var(--gold)",fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7,fontFamily:"var(--ff-c)",letterSpacing:".5px",textTransform:"uppercase"}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  Ask AI: Scholarship Scenario for {sel.name.split(" ")[0]}
                </button>
              </div>
            ) : (
              <div className="card" style={{display:"flex",alignItems:"center",justifyContent:"center",border:"1px dashed var(--bd2)"}}>
                <div style={{textAlign:"center",color:"var(--t3)"}}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{margin:"0 auto 8px",display:"block"}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <div style={{fontSize:12}}>Click a prospect to view details</div>
                  <div style={{fontSize:10,marginTop:4,color:"var(--t3)"}}>Then ask AI for scholarship scenarios</div>
                </div>
              </div>
            )}

            {/* Mini cap summary */}
            <div style={{display:"flex",flexDirection:"column",gap:10,overflowY:"auto"}}>
              <div className="card" style={{padding:"14px 16px"}}>
                <div style={{fontSize:11,fontWeight:700,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".8px",marginBottom:10,fontFamily:"var(--ff-c)"}}>Cap Snapshot</div>
                {(()=>{
                  const eq=ROSTER.reduce((a,p)=>a+p.eq,0);
                  const freeing=ROSTER.filter(p=>p.elig.includes("Last")).reduce((a,p)=>a+p.eq,0);
                  const committed=RECRUITS.filter(r=>r.status==="Verbal Commit").length;
                  return (
                    <>
                      {[
                        ["Used",`${eq.toFixed(2)} EQ`,"var(--gold)",eq/14],
                        ["Remaining",`${(14-eq).toFixed(2)} EQ`,"var(--b)",(14-eq)/14],
                        ["Freeing (Seniors)",`+${freeing.toFixed(2)} EQ`,"var(--g)",freeing/14],
                        ["Projected Available",`${(14-eq+freeing).toFixed(2)} EQ`,"var(--purple)",(14-eq+freeing)/14],
                      ].map(([l,v,c,p])=>(
                        <div key={l} style={{marginBottom:8}}>
                          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:3}}>
                            <span style={{color:"var(--t2)"}}>{l}</span>
                            <span style={{fontFamily:"var(--ff-m)",color:c,fontWeight:700}}>{v}</span>
                          </div>
                          <div className="pbar" style={{height:5}}><div className="pfill" style={{width:`${Math.min(Math.abs(p)*100,100)}%`,background:c}}/></div>
                        </div>
                      ))}
                      <div style={{marginTop:10,padding:"8px 10px",background:"rgba(255,184,28,.07)",border:"1px solid rgba(255,184,28,.15)",borderRadius:7}}>
                        <div style={{fontSize:10,color:"var(--gold)",fontWeight:700,marginBottom:2}}>💡 Switch to AI Advisor tab</div>
                        <div style={{fontSize:10,color:"var(--t3)"}}>Get scenario-by-scenario cap analysis for every recruit in your pipeline.</div>
                      </div>
                    </>
                  );
                })()}
              </div>
              <div className="card" style={{padding:"14px 16px"}}>
                <div style={{fontSize:11,fontWeight:700,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".8px",marginBottom:8,fontFamily:"var(--ff-c)"}}>Positional Needs (1-4-3-3)</div>
                {[
                  {pos:"LB",need:"Critical",note:"Torres (Sr) departing"},
                  {pos:"GK",need:"High",note:"Marchetti (Sr) departing"},
                  {pos:"LW",need:"High",note:"Jones + Tew (both Sr) departing"},
                  {pos:"ST",need:"Monitor",note:"Guthrie returning, depth thin"},
                  {pos:"CB",need:"Monitor",note:"3 CBs, one at-risk GPA"},
                ].map(({pos,need,note})=>(
                  <div key={pos} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:"1px solid var(--bd)"}}>
                    <span className="tag td" style={{fontSize:9,width:30,textAlign:"center",flexShrink:0}}>{pos}</span>
                    <span className={`tag ${need==="Critical"?"tr":need==="High"?"ty":"tb"}`} style={{fontSize:9,flexShrink:0}}>{need}</span>
                    <span style={{fontSize:10,color:"var(--t3)",flex:1}}>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab==="agent" && (
        <div style={{flex:1,minHeight:0}}>
          <ScholarshipAgent selectedRecruit={sel}/>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   MODULE: DEPTH CHART
   ============================================================ */
const DepthMod = () => {
  const [fm,setFm]=useState("4-3-3");
  const formations={"4-3-3":{GK:[{x:50,y:86}],RB:[{x:79,y:72}],CB:[{x:62,y:72},{x:38,y:72}],LB:[{x:21,y:72}],RCM:[{x:72,y:51}],CM:[{x:50,y:47}],LCM:[{x:28,y:51}],RW:[{x:79,y:27}],ST:[{x:50,y:21}],LW:[{x:21,y:27}]},"4-2-3-1":{GK:[{x:50,y:86}],RB:[{x:79,y:74}],CB:[{x:62,y:74},{x:38,y:74}],LB:[{x:21,y:74}],CDM:[{x:62,y:58},{x:38,y:58}],RAM:[{x:75,y:38}],CAM:[{x:50,y:35}],LAM:[{x:25,y:38}],ST:[{x:50,y:18}]},"3-5-2":{GK:[{x:50,y:86}],CB:[{x:72,y:72},{x:50,y:72},{x:28,y:72}],RWB:[{x:88,y:52}],RCM:[{x:70,y:50}],CM:[{x:50,y:47}],LCM:[{x:30,y:50}],LWB:[{x:12,y:52}],RST:[{x:65,y:21}],LST:[{x:35,y:21}]}};
  const posMap={"4-3-3":{GK:[ROSTER[0],ROSTER[11]],RB:[ROSTER[4]],CB:[ROSTER[1],ROSTER[2]],LB:[ROSTER[3]],RCM:[ROSTER[7]],CM:[ROSTER[5]],LCM:[ROSTER[6]],RW:[ROSTER[9]],ST:[ROSTER[10]],LW:[ROSTER[8]]}};
  const curFm=formations[fm]||formations["4-3-3"];
  const totalBudget=BUDGET.expenses.find(e=>e.cat==="Scholarship Aid")?.budget||940000;
  const committed=BUDGET.totalAid;
  return (
    <div style={{padding:"22px 26px",height:"100%",display:"flex",flexDirection:"column",gap:14,overflow:"hidden"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <div><div className="section-h">Depth Chart</div><div className="section-sub">Formation builder with scholarship overlay</div></div>
        <div style={{display:"flex",gap:14,fontSize:12}}>
          <span style={{color:"var(--t3)"}}>BUDGET <span style={{fontFamily:"var(--ff-m)",color:"var(--gold)",fontWeight:700}}>${totalBudget.toLocaleString()}</span></span>
          <span style={{color:"var(--t3)"}}>COMMITTED <span style={{fontFamily:"var(--ff-m)",color:"var(--o)",fontWeight:700}}>${committed.toLocaleString()}</span></span>
          <span style={{color:"var(--t3)"}}>REMAINING <span style={{fontFamily:"var(--ff-m)",color:"var(--r)",fontWeight:700}}>${(totalBudget-committed).toLocaleString()}</span></span>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
        <span style={{fontSize:10,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".8px",fontWeight:600,fontFamily:"var(--ff-c)"}}>Formation</span>
        {["4-3-3","4-2-3-1","3-5-2","4-4-2"].map(f=>(
          <button key={f} onClick={()=>setFm(f)} style={{padding:"5px 13px",borderRadius:6,fontSize:11,fontWeight:700,fontFamily:"var(--ff-c)",letterSpacing:".5px",background:fm===f?"var(--gold)":"var(--s3)",color:fm===f?"#000":"var(--t2)",border:`1px solid ${fm===f?"var(--gold)":"var(--bd)"}`,cursor:"pointer",transition:"all .18s"}}>{f}</button>
        ))}
        <div style={{flex:1,marginLeft:8}}><div className="pbar" style={{height:8}}><div className="pfill" style={{width:`${(committed/totalBudget)*100}%`,background:"linear-gradient(90deg,var(--g),var(--gold),var(--r))"}}/></div></div>
      </div>
      <div style={{flex:1,display:"grid",gridTemplateColumns:"1fr 190px",gap:12,minHeight:0}}>
        <div style={{position:"relative",borderRadius:12,overflow:"hidden",border:"2px solid rgba(255,255,255,.06)"}}>
          <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center,#1e6b30 0%,#155225 40%,#0d3a1a 100%)"}}>
            <svg width="100%" height="100%" viewBox="0 0 400 560" style={{position:"absolute",inset:0}}>
              <rect x="20" y="20" width="360" height="520" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="1.5"/>
              <line x1="20" y1="280" x2="380" y2="280" stroke="rgba(255,255,255,.18)" strokeWidth="1.5"/>
              <circle cx="200" cy="280" r="55" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="1.5"/>
              <circle cx="200" cy="280" r="3" fill="rgba(255,255,255,.3)"/>
              <rect x="110" y="20" width="180" height="80" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1.5"/>
              <rect x="155" y="20" width="90" height="40" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1.5"/>
              <rect x="110" y="460" width="180" height="80" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1.5"/>
              <rect x="155" y="500" width="90" height="40" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1.5"/>
              {[0,1,2,3,4].map(i=><rect key={i} x="20" y={20+i*104} width="360" height="52" fill={i%2===0?"rgba(255,255,255,.012)":"transparent"}/>)}
            </svg>
          </div>
          {Object.entries(curFm).map(([pk,spots])=>spots.map((spot,idx)=>{
            const p=posMap["4-3-3"]?.[pk]?.[idx];
            const inj=p?.injury;
            return (
              <div key={`${pk}-${idx}`} style={{position:"absolute",left:`${spot.x}%`,top:`${spot.y}%`,transform:"translate(-50%,-50%)",width:58,height:58,borderRadius:"50%",background:inj?"rgba(255,68,68,.9)":p?"rgba(255,184,28,.85)":"rgba(255,255,255,.12)",border:`2px solid ${inj?"var(--r)":p?"var(--gold)":"rgba(255,255,255,.25)"}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",zIndex:2,boxShadow:p?`0 0 18px ${inj?"rgba(255,68,68,.4)":"rgba(255,184,28,.3)"}`:""}} >
                <div style={{fontSize:8,fontWeight:700,color:p?"#000":"rgba(255,255,255,.4)",textAlign:"center",lineHeight:1.2,fontFamily:"var(--ff-c)"}}>
                  {p?`#${p.jersey}`:"+"}<br/>
                  {p?(p.name.split(" ")[1]||p.name.split(" ")[0]).substring(0,7):pk}
                </div>
                {p&&<div style={{fontSize:7,color:"rgba(0,0,0,.65)",fontFamily:"var(--ff-m)",fontWeight:700,marginTop:1}}>{p.aid>0?`$${(p.aid/1000).toFixed(0)}K`:"Walk-on"}</div>}
              </div>
            );
          }))}
        </div>
        <div style={{background:"var(--s2)",border:"1px solid var(--bd)",borderRadius:12,padding:12,overflowY:"auto"}}>
          <div style={{fontSize:10,fontWeight:700,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".8px",marginBottom:10,fontFamily:"var(--ff-c)"}}>Current Roster</div>
          {ROSTER.map(p=>(
            <div key={p.id} style={{background:"var(--s3)",borderRadius:7,padding:"7px 9px",marginBottom:5,display:"flex",gap:8,alignItems:"center",cursor:"pointer",border:"1px solid var(--bd)"}}>
              <div style={{width:26,height:26,borderRadius:5,background:"var(--gold)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,color:"#000",fontFamily:"var(--ff-c)",flexShrink:0}}>{p.pos}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:10,fontWeight:700,color:"var(--t1)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.name.split(" ")[1]?.substring(0,8)}</div>
                <div style={{fontSize:9,color:"var(--t3)",fontFamily:"var(--ff-m)"}}>{p.aid>0?`$${(p.aid/1000).toFixed(0)}K`:"Walk-on"}</div>
              </div>
              {p.injury&&<div style={{width:6,height:6,borderRadius:"50%",background:"var(--r)",flexShrink:0}}/>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   MODULE: SPORTS SCIENCE
   ============================================================ */
const ScienceMod = () => {
  const avgPL=Math.round(PLAYER_LOAD.reduce((a,p)=>a+p.pl,0)/PLAYER_LOAD.length);
  const hiRisk=PLAYER_LOAD.filter(p=>p.risk!=="Low");
  return (
    <div style={{padding:"22px 26px",overflowY:"auto",height:"100%",display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div className="section-h">Sports Science & Wellness</div><div className="section-sub">High-performance load monitoring via Catapult and Smartabase.</div></div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn-ghost" style={{fontSize:12}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Upload Readiness
          </button>
          <button className="btn-gold" style={{fontSize:12}}>Catapult Live Sync</button>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
        {[
          {lbl:"Team Readiness",val:"88%",sub:"OPTIMAL",color:"var(--g)",ghost:<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth=".8"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="16 2 12 6 8 2"/></svg>},
          {lbl:"Avg Player Load",val:`${avgPL} PL`,sub:"V. DUKE",color:"var(--b)",ghost:<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth=".8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>},
          {lbl:"Injury Risk",val:hiRisk.length>1?"MODERATE":"LOW",sub:`${hiRisk.length} MODIFIED`,color:hiRisk.length>1?"var(--gold)":"var(--g)",ghost:<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth=".8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>},
          {lbl:"Nutrition Score",val:"A−",sub:"94% COMPLIANCE",color:"var(--o)",ghost:<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth=".8"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/></svg>},
        ].map((k,i)=>(
          <div key={i} className="kpi" style={{minHeight:100}}>
            <div style={{position:"absolute",right:-8,bottom:-14,color:k.color,opacity:.06,transform:"scale(1.5)"}}>{k.ghost}</div>
            <div style={{position:"relative",zIndex:1}}>
              <div className="kpi-lbl">{k.lbl}</div>
              <div className="kpi-val" style={{color:k.color,fontSize:34}}>{k.val}</div>
              <div className="kpi-sub">{k.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"13px 18px",borderBottom:"1px solid var(--bd)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:38,height:38,borderRadius:9,background:"var(--gold)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            </div>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:"var(--t1)",fontFamily:"var(--ff-c)",textTransform:"uppercase",letterSpacing:".8px"}}>Match Performance: v. Duke</div>
              <div style={{fontSize:10,color:"var(--t3)"}}>2024-10-17 · CATAPULT HIGH FIDELITY</div>
            </div>
          </div>
          <div style={{display:"flex",gap:20,fontSize:12}}>
            <span style={{color:"var(--t3)"}}>AVG PL/MIN <span style={{color:"var(--gold)",fontFamily:"var(--ff-m)",fontWeight:700,fontSize:16}}>{(PLAYER_LOAD.reduce((a,p)=>a+p.plMin,0)/PLAYER_LOAD.length).toFixed(2)}</span></span>
            <span style={{color:"var(--t3)"}}>AVG HSD (Y) <span style={{color:"var(--b)",fontFamily:"var(--ff-m)",fontWeight:700,fontSize:16}}>{Math.round(PLAYER_LOAD.reduce((a,p)=>a+p.hsd,0)/PLAYER_LOAD.length)}</span></span>
          </div>
        </div>
        <table className="dt">
          <thead><tr><th>Player</th><th>Pos</th><th>Tot PL</th><th>PL/Min</th><th>HSD (Y)</th><th>Tot Dist (Y)</th><th>Max Vel (MPH)</th><th>Load</th><th>Risk</th></tr></thead>
          <tbody>
            {PLAYER_LOAD.map((p,i)=>(
              <tr key={i}>
                <td className="hl">{p.name}</td>
                <td><span className="tag td" style={{fontSize:10}}>{p.pos}</span></td>
                <td><span style={{fontFamily:"var(--ff-m)",fontSize:12}}>{p.pl}</span></td>
                <td><span style={{fontFamily:"var(--ff-m)",fontSize:13,fontWeight:700,color:p.plMin>10.5?"var(--r)":p.plMin>9.5?"var(--gold)":"var(--g)"}}>{p.plMin}</span></td>
                <td><span style={{fontFamily:"var(--ff-m)",fontSize:12,color:"var(--b)"}}>{p.hsd}</span></td>
                <td><span style={{fontFamily:"var(--ff-m)",fontSize:12}}>{p.dist.toLocaleString()}</span></td>
                <td><span style={{fontFamily:"var(--ff-m)",fontSize:13,fontWeight:700,color:"var(--g)"}}>{p.maxVel}</span></td>
                <td><span className={`tag ${p.load==="Very High"?"tr":p.load==="High"?"ty":p.load==="Optimal"?"tg":"td"}`} style={{fontSize:9}}>{p.load}</span></td>
                <td><span className={`tag ${p.risk==="Med"?"ty":p.risk==="High"?"tr":"tg"}`} style={{fontSize:9}}>{p.risk}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ============================================================
   MODULE: ACADEMICS (new dedicated module)
   ============================================================ */
const AcademicsMod = () => {
  const critical=ACADEMICS.filter(a=>a.risk==="Critical");
  const high=ACADEMICS.filter(a=>a.risk==="High");
  const monitor=ACADEMICS.filter(a=>a.risk==="Med");
  return (
    <div style={{padding:"22px 26px",overflowY:"auto",height:"100%",display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div className="section-h">Academics</div><div className="section-sub">NCAA eligibility · Study hall · Advisor: Prof. Dana Wells</div></div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn-ghost" style={{fontSize:12}}>Study Hall Report</button>
          <button className="btn-gold" style={{fontSize:12}}>Eligibility Certify</button>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
        {[
          {lbl:"Team Avg GPA",val:(ROSTER.reduce((a,p)=>a+p.gpa,0)/ROSTER.length).toFixed(2),sub:"Goal: 3.2+",color:(ROSTER.reduce((a,p)=>a+p.gpa,0)/ROSTER.length)>=3.2?"var(--g)":"var(--gold)"},
          {lbl:"At Risk (< 2.7)",val:ROSTER.filter(p=>p.gpa<2.7).length,sub:"Needs intervention",color:"var(--r)"},
          {lbl:"Study Hall Active",val:ACADEMICS.filter(a=>a.studyHall).length,sub:"Players enrolled",color:"var(--b)"},
          {lbl:"In Tutoring",val:ACADEMICS.filter(a=>a.tutoring).length,sub:"Active tutoring plans",color:"var(--purple)"},
        ].map((k,i)=>(
          <div key={i} className="kpi"><div className="kpi-lbl">{k.lbl}</div><div className="kpi-val" style={{color:k.color,fontSize:30}}>{k.val}</div><div className="kpi-sub">{k.sub}</div></div>
        ))}
      </div>
      {critical.length>0&&(
        <div style={{background:"rgba(255,68,68,.08)",border:"1px solid rgba(255,68,68,.25)",borderRadius:10,padding:14}}>
          <div style={{fontSize:11,fontWeight:700,color:"var(--r)",textTransform:"uppercase",letterSpacing:".8px",marginBottom:8,fontFamily:"var(--ff-c)"}}>🚨 CRITICAL — Eligibility at Risk</div>
          {critical.map(a=>(
            <div key={a.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid rgba(255,68,68,.1)"}}>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:"var(--t1)"}}>{a.player}</div><div style={{fontSize:11,color:"var(--t3)"}}>{a.major} · {a.credits} credits · Advisor: {a.advisor}</div></div>
              <span style={{fontFamily:"var(--ff-m)",fontSize:16,color:"var(--r)",fontWeight:700}}>{a.gpa}</span>
              <span className="tag tr">CRITICAL</span>
              <button className="btn-ghost" style={{fontSize:11,padding:"4px 10px"}}>Intervention Plan</button>
            </div>
          ))}
        </div>
      )}
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"12px 16px",borderBottom:"1px solid var(--bd)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:12,fontWeight:700,color:"var(--t1)",fontFamily:"var(--ff-c)",textTransform:"uppercase",letterSpacing:".8px"}}>Full Academic Roster — Spring 2025</div>
          <span style={{fontSize:11,color:"var(--t3)"}}>Eligibility Cert Due: Jan 15</span>
        </div>
        <table className="dt">
          <thead><tr><th>Player</th><th>Major</th><th>GPA</th><th>Credits</th><th>Status</th><th>Study Hall</th><th>Tutoring</th><th>Risk</th><th>Action</th></tr></thead>
          <tbody>
            {[...ROSTER].sort((a,b)=>a.gpa-b.gpa).map(p=>{
              const ac=ACADEMICS.find(a=>a.player===p.name);
              return (
                <tr key={p.id}>
                  <td className="hl">{p.name}</td>
                  <td style={{color:"var(--t3)",fontSize:12}}>{p.major}</td>
                  <td><span style={{fontFamily:"var(--ff-m)",fontSize:14,fontWeight:700,color:p.gpa<2.5?"var(--r)":p.gpa<2.7?"var(--r)":p.gpa<3.0?"var(--gold)":p.gpa>=3.5?"var(--g)":"var(--t1)"}}>{p.gpa}</span></td>
                  <td><span style={{fontFamily:"var(--ff-m)",fontSize:12}}>{ac?.credits||"—"}</span></td>
                  <td><span className={`tag ${p.gpa>=3.5?"tg":p.gpa>=3.0?"tg":p.gpa>=2.7?"td":p.gpa>=2.5?"tr":"tr"}`} style={{fontSize:9}}>{p.gpa>=3.5?"Dean's List":p.gpa>=3.0?"Good Standing":p.gpa>=2.7?"Monitor":p.gpa>=2.5?"At Risk":"CRITICAL"}</span></td>
                  <td style={{textAlign:"center"}}>{ac?.studyHall?<span className="tag tg" style={{fontSize:9}}>✓ Yes</span>:<span className="tag td" style={{fontSize:9}}>No</span>}</td>
                  <td style={{textAlign:"center"}}>{ac?.tutoring?<span className="tag tb" style={{fontSize:9}}>✓ Active</span>:<span className="tag td" style={{fontSize:9}}>No</span>}</td>
                  <td><span className={`tag ${ac?.risk==="Critical"?"tr":ac?.risk==="High"?"tr":ac?.risk==="Med"?"ty":ac?.risk==="Low"?"tg":"td"}`} style={{fontSize:9}}>{ac?.risk||"—"}</span></td>
                  <td>{p.gpa<2.7?<button className="btn-ghost" style={{fontSize:10,padding:"3px 9px",color:"var(--r)"}}>Advising</button>:<span style={{fontSize:11,color:"var(--t3)"}}>—</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <AIPanel context="academics"/>
    </div>
  );
};

/* ============================================================
   MODULE: PLAYER DEVELOPMENT
   ============================================================ */
const DevelopmentMod = () => (
  <div style={{padding:"22px 26px",overflowY:"auto",height:"100%",display:"flex",flexDirection:"column",gap:16}}>
    <div><div className="section-h">Player Development</div><div className="section-sub">Individual development plans · Technical metrics · Progress tracking</div></div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
      {[
        {lbl:"Development Plans Active",val:ROSTER.filter(p=>p.status==="Active").length,sub:"Individual IDPs",color:"var(--gold)"},
        {lbl:"Avg Goals / Match",val:(ROSTER.reduce((a,p)=>a+p.goals,0)/ROSTER.reduce((a,p)=>a+p.apps,0)*22).toFixed(1),sub:"Team total this season",color:"var(--g)"},
        {lbl:"Avg Assists / Match",val:(ROSTER.reduce((a,p)=>a+p.assists,0)/ROSTER.reduce((a,p)=>a+p.apps,0)*22).toFixed(1),sub:"Team total this season",color:"var(--b)"},
      ].map((k,i)=>(
        <div key={i} className="kpi"><div className="kpi-lbl">{k.lbl}</div><div className="kpi-val" style={{color:k.color,fontSize:30}}>{k.val}</div><div className="kpi-sub">{k.sub}</div></div>
      ))}
    </div>
    <div className="card" style={{padding:0,overflow:"hidden"}}>
      <div style={{padding:"12px 16px",borderBottom:"1px solid var(--bd)"}}>
        <div style={{fontSize:12,fontWeight:700,color:"var(--t1)",fontFamily:"var(--ff-c)",textTransform:"uppercase",letterSpacing:".8px"}}>Individual Development Rankings</div>
      </div>
      <table className="dt">
        <thead><tr><th>Player</th><th>Pos</th><th>Yr</th><th>Apps</th><th>Goals</th><th>Assists</th><th>G+A</th><th>GPA</th><th>Load</th><th>Development Focus</th></tr></thead>
        <tbody>
          {[...ROSTER].sort((a,b)=>(b.goals+b.assists)-(a.goals+a.assists)).map((p,i)=>{
            const loadP=PLAYER_LOAD.find(l=>l.name===p.name);
            const focus=p.goals>10?"Finishing refinement":p.assists>5?"Creative play":"Position fundamentals";
            return (
              <tr key={p.id}>
                <td><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontFamily:"var(--ff-m)",fontSize:11,color:"var(--gold)",fontWeight:700,width:18}}>#{i+1}</span><span className="hl">{p.name}</span></div></td>
                <td><span className="tag td" style={{fontSize:10}}>{p.pos}</span></td>
                <td style={{color:"var(--t3)"}}>{p.yr}</td>
                <td><span style={{fontFamily:"var(--ff-m)",fontSize:12}}>{p.apps}</span></td>
                <td><span style={{fontFamily:"var(--ff-m)",fontSize:13,fontWeight:700,color:p.goals>10?"var(--g)":p.goals>5?"var(--gold)":"var(--t2)"}}>{p.goals}</span></td>
                <td><span style={{fontFamily:"var(--ff-m)",fontSize:13,fontWeight:700,color:p.assists>8?"var(--b)":p.assists>3?"var(--gold)":"var(--t2)"}}>{p.assists}</span></td>
                <td><span style={{fontFamily:"var(--ff-m)",fontSize:14,fontWeight:700,color:"var(--gold)"}}>{p.goals+p.assists}</span></td>
                <td><span style={{fontFamily:"var(--ff-m)",fontSize:12,color:p.gpa<2.7?"var(--r)":p.gpa>=3.5?"var(--g)":"var(--t2)"}}>{p.gpa}</span></td>
                <td>{loadP?<span className={`tag ${loadP.load==="Very High"?"tr":loadP.load==="High"?"ty":"tg"}`} style={{fontSize:9}}>{loadP.load}</span>:<span className="tag td" style={{fontSize:9}}>N/A</span>}</td>
                <td style={{fontSize:11,color:"var(--t3)"}}>{focus}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

/* ============================================================
   MODULE: CAMPS & CLINICS
   ============================================================ */
const CampsMod = () => {
  const totalReg=CAMPS.reduce((a,c)=>a+c.registered,0);
  const totalRev=CAMPS.reduce((a,c)=>a+c.revenue,0);
  const uniFee=totalRev*0.05;
  const channels=["Instagram Ads","Email / Website","Direct Outreach","Social Media","Word of Mouth"];
  return (
    <div style={{padding:"22px 26px",overflowY:"auto",height:"100%",display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div className="section-h">Camps & Clinics Hub</div>
          <div className="section-sub">Centralized registration, university logistics, and marketing coordination.</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn-ghost" style={{fontSize:12}}>Export Ryzer CSV</button>
          <button className="btn-gold" style={{fontSize:12}}>Open Ryzer ↗</button>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
        {[
          {lbl:"Total Historical Reg.",val:totalReg,sub:"All camps combined",color:"var(--b)",ghost:"👥"},
          {lbl:"Avg. Attendance",val:(totalReg/CAMPS.filter(c=>c.registered>0).length).toFixed(1),sub:"Per camp",color:"var(--g)",ghost:"📈"},
          {lbl:"Uni. Fee (5%)",val:`$${uniFee.toLocaleString()}`,sub:"Revenue share to Pitt",color:"var(--r)",ghost:"↗"},
          {lbl:"Recent Net Profit",val:`$${totalRev.toLocaleString()}`,sub:"Current season",color:"var(--gold)",ghost:"$"},
        ].map((k,i)=>(
          <div key={i} className="kpi">
            <div className="kpi-ghost" style={{fontSize:48,fontFamily:"var(--ff-h)"}}>{k.ghost}</div>
            <div style={{position:"relative",zIndex:1}}>
              <div style={{width:30,height:30,borderRadius:7,background:`${k.color}18`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={k.color} strokeWidth="2"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
              </div>
              <div className="kpi-lbl">{k.lbl}</div>
              <div className="kpi-val" style={{color:k.color,fontSize:28}}>{k.val}</div>
              <div className="kpi-sub">{k.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div className="card">
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
            <span style={{fontSize:16}}>📅</span>
            <div style={{fontSize:14,fontWeight:700,color:"var(--t1)",fontFamily:"var(--ff-c)",textTransform:"uppercase",letterSpacing:".8px"}}>Upcoming Camp Schedule</div>
          </div>
          {CAMPS.map(c=>{
            const pct=Math.round((c.registered/c.capacity)*100);
            const sc=c.status==="Almost Full"?"var(--r)":c.status==="Open"?"var(--g)":"var(--t3)";
            return (
              <div key={c.id} style={{padding:"12px 14px",background:"var(--s3)",borderRadius:9,marginBottom:8,border:"1px solid var(--bd)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:"var(--t1)"}}>{c.name}</div>
                    <div style={{fontSize:11,color:"var(--t3)"}}>{c.dates}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontFamily:"var(--ff-m)",fontSize:12,color:"var(--t2)"}}>{c.registered}/{c.capacity}</div>
                    <div style={{fontSize:10,fontWeight:700,color:sc,textTransform:"uppercase",letterSpacing:".5px"}}>{c.status}</div>
                  </div>
                </div>
                {c.registered>0&&<div className="pbar"><div className="pfill" style={{width:`${pct}%`,background:pct>85?"var(--r)":pct>50?"var(--gold)":"var(--g)"}}/></div>}
                <div style={{display:"flex",justifyContent:"space-between",marginTop:6,fontSize:11}}>
                  <span style={{color:"var(--t3)"}}>Price: ${c.price}</span>
                  <span style={{color:"var(--g)",fontFamily:"var(--ff-m)",fontWeight:600}}>${c.revenue.toLocaleString()} revenue</span>
                </div>
              </div>
            );
          })}
          <button className="btn-gold" style={{width:"100%",fontSize:12,justifyContent:"center",marginTop:4}}>+ Add Camp</button>
        </div>
        <div className="card">
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
            <span style={{fontSize:16}}>📢</span>
            <div style={{fontSize:14,fontWeight:700,color:"var(--t1)",fontFamily:"var(--ff-c)",textTransform:"uppercase",letterSpacing:".8px"}}>Marketing & Discovery Insights</div>
          </div>
          <div style={{fontSize:11,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".8px",marginBottom:10,fontFamily:"var(--ff-c)"}}>Registration Channels (Lead Source)</div>
          {channels.map((ch,i)=>{
            const leads=[18,12,8,5,3][i];
            const max=18;
            return (
              <div key={ch} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                  <span style={{color:"var(--t2)"}}>{ch}</span>
                  <span style={{fontFamily:"var(--ff-m)",color:"var(--gold)",fontWeight:600}}>{leads} Leads</span>
                </div>
                <div className="pbar" style={{height:8}}>
                  <div className="pfill" style={{width:`${(leads/max)*100}%`,background:"var(--gold)"}}/>
                </div>
              </div>
            );
          })}
          <div style={{marginTop:14,padding:"10px 12px",background:"rgba(255,184,28,.08)",border:"1px solid rgba(255,184,28,.15)",borderRadius:8}}>
            <div style={{fontSize:11,fontWeight:700,color:"var(--gold)",marginBottom:4}}>💡 Top Channel: Instagram Ads</div>
            <div style={{fontSize:11,color:"var(--t2)"}}>18 leads this cycle. Recommend 15% budget increase for Spring ID Clinic campaign.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   MODULE: STAFF
   ============================================================ */
const StaffMod = () => {
  const {staffList, toggleTask, addTask, updateTask, editMode} = useData();
  const pc={High:"var(--r)",Med:"var(--gold)",Low:"var(--b)"};
  return (
    <div style={{padding:"22px 26px",overflowY:"auto",height:"100%",display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div className="section-h">Staff Accountability</div><div className="section-sub">{staffList.flatMap(s=>s.tasks).filter(t=>!t.done).length} Open · {staffList.flatMap(s=>s.tasks).filter(t=>t.done).length} Completed</div></div>
        {editMode&&<span style={{fontSize:11,color:"var(--gold)",fontFamily:"var(--ff-c)",fontWeight:700}}>✏️ CLICK TASKS TO EDIT</span>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12}}>
        {staffList.map(s=>{
          const done=s.tasks.filter(t=>t.done).length, total=s.tasks.length, pct=total?Math.round((done/total)*100):0;
          return (
            <div key={s.id} className="card">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <div style={{width:38,height:38,borderRadius:10,background:"var(--s4)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--ff-h)",fontSize:14,color:"var(--gold)"}}>
                    {s.name.split(" ").map(n=>n[0]).slice(0,2).join("")}
                  </div>
                  <div><div style={{fontSize:14,fontWeight:700,color:"var(--t1)"}}>{s.name}</div><div style={{fontSize:11,color:"var(--t3)"}}>{s.role}</div></div>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                  <div style={{textAlign:"right"}}><div style={{fontFamily:"var(--ff-m)",fontSize:20,color:pct===100?"var(--g)":pct>60?"var(--gold)":"var(--r)",fontWeight:700}}>{pct}%</div><div style={{fontSize:10,color:"var(--t3)"}}>done</div></div>
                  {editMode&&<button onClick={()=>addTask(s.id)} style={{fontSize:10,padding:"2px 9px",borderRadius:5,background:"rgba(255,184,28,.1)",border:"1px solid rgba(255,184,28,.25)",color:"var(--gold)",cursor:"pointer"}}>+ Task</button>}
                </div>
              </div>
              <div className="pbar" style={{marginBottom:10}}><div className="pfill" style={{width:`${pct}%`,background:pct===100?"var(--g)":pct>60?"var(--gold)":"var(--r)"}}/></div>
              {s.tasks.map((t,ti)=>(
                <div key={ti} onClick={()=>!editMode&&toggleTask(s.id,ti)}
                  style={{display:"flex",alignItems:"center",gap:9,padding:"8px 10px",background:"var(--s3)",borderRadius:7,marginBottom:5,cursor:editMode?"default":"pointer",opacity:t.done?.55:1,transition:"all .12s"}}>
                  <div onClick={e=>{e.stopPropagation();toggleTask(s.id,ti);}}
                    style={{width:18,height:18,borderRadius:4,border:`2px solid ${t.done?"var(--g)":pc[t.pri]||"var(--t3)"}`,background:t.done?"var(--g)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .12s",cursor:"pointer"}}>
                    {t.done&&<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    {editMode
                      ?<EditCell value={t.text} onChange={v=>updateTask(s.id,ti,'text',v)} style={{fontSize:12,width:"100%"}}/>
                      :<div style={{fontSize:12,color:t.done?"var(--t3)":"var(--t1)",textDecoration:t.done?"line-through":"none",fontWeight:t.done?400:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{t.text}</div>}
                  </div>
                  <div style={{display:"flex",gap:6,flexShrink:0}}>
                    {editMode
                      ?<EditCell value={t.pri} onChange={v=>updateTask(s.id,ti,'pri',v)} options={["High","Med","Low"]} style={{width:52}}/>
                      :<span style={{fontSize:10,color:pc[t.pri],fontWeight:700,fontFamily:"var(--ff-c)"}}>{t.pri}</span>}
                    {editMode
                      ?<EditCell value={t.due} onChange={v=>updateTask(s.id,ti,'due',v)} style={{width:70,fontSize:10}}/>
                      :<span style={{fontSize:10,color:"var(--t3)"}}>Due {t.due}</span>}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ============================================================
   OTHER MODULES (Medical, Scouting, Transfer, NIL, Alumni, Schedule)
   ============================================================ */
const MedicalMod = () => (
  <div style={{padding:"22px 26px",overflowY:"auto",height:"100%",display:"flex",flexDirection:"column",gap:16}}>
    <div><div className="section-h">Medical & Injury Tracker</div><div className="section-sub">{INJURIES.filter(i=>i.status!=="Cleared").length} Active · Return-to-play protocols</div></div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
      {INJURIES.map(inj=>{
        const sc={"Rehabbing":"var(--gold)","Day-to-Day":"var(--o)","Cleared":"var(--g)"};
        return (
          <div key={inj.id} className="card" style={{borderLeft:`3px solid ${sc[inj.status]}`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <div style={{fontFamily:"var(--ff-c)",fontSize:17,fontWeight:700}}>{inj.player}</div>
              <span className={`tag ${inj.status==="Cleared"?"tg":inj.status==="Day-to-Day"?"to":"ty"}`}>{inj.status}</span>
            </div>
            <div style={{fontSize:10,color:"var(--t3)",marginBottom:10}}>{inj.pos}</div>
            {[["Injury",inj.type],["Severity",inj.sev],["Injured",inj.injured],["Est. Return",inj.returnEst],["Protocol",inj.protocol],["Missed Games",inj.missed]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid var(--bd)"}}>
                <span style={{fontSize:10,color:"var(--t3)"}}>{l}</span>
                <span style={{fontSize:11,fontWeight:600,color:l==="Est. Return"?"var(--b)":"var(--t1)"}}>{v}</span>
              </div>
            ))}
            <button className="btn-ghost" style={{width:"100%",marginTop:10,fontSize:11,justifyContent:"center"}}>Update Status</button>
          </div>
        );
      })}
    </div>
    <div className="card" style={{padding:0,overflow:"hidden"}}>
      <table className="dt">
        <thead><tr><th>Player</th><th>Injury</th><th>Severity</th><th>Date</th><th>Return</th><th>Protocol</th><th>Status</th><th>Missed</th></tr></thead>
        <tbody>{INJURIES.map(i=>(
          <tr key={i.id}>
            <td className="hl">{i.player}</td><td>{i.type}</td>
            <td><span className={`tag ${i.sev==="Cleared"?"tg":i.sev==="Moderate"?"ty":"to"}`} style={{fontSize:9}}>{i.sev}</span></td>
            <td style={{fontFamily:"var(--ff-m)",fontSize:12}}>{i.injured}</td>
            <td style={{color:"var(--b)",fontFamily:"var(--ff-m)",fontSize:12}}>{i.returnEst}</td>
            <td style={{fontSize:11,color:"var(--t2)"}}>{i.protocol}</td>
            <td><span className={`tag ${i.status==="Cleared"?"tg":i.status==="Day-to-Day"?"to":"ty"}`} style={{fontSize:9}}>{i.status}</span></td>
            <td style={{fontFamily:"var(--ff-m)",fontSize:12}}>{i.missed}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  </div>
);

const ScoutMod = () => (
  <div style={{padding:"22px 26px",overflowY:"auto",height:"100%",display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div><div className="section-h">Scouting & Film</div><div className="section-sub">{SCOUTING_NOTES.length} Reports · {SCOUTING_NOTES.filter(s=>s.hasVideo).length} with Film</div></div>
      <button className="btn-gold">+ Scouting Report</button>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12}}>
      {SCOUTING_NOTES.map(s=>(
        <div key={s.id} className="card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div><div style={{fontFamily:"var(--ff-c)",fontSize:18,fontWeight:700}}>{s.player}</div><div style={{fontSize:11,color:"var(--t3)"}}>by {s.scout} · {s.date}</div></div>
            <div style={{textAlign:"right"}}><Stars v={s.rating}/>{s.hasVideo&&<div style={{marginTop:5,fontSize:10,color:"var(--b)",display:"flex",gap:3,alignItems:"center",justifyContent:"flex-end"}}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>Film</div>}</div>
          </div>
          <div style={{fontSize:10,color:"var(--gold)",fontWeight:700,marginBottom:5,fontFamily:"var(--ff-c)",textTransform:"uppercase",letterSpacing:".5px"}}>{s.event}</div>
          <div style={{fontSize:12,color:"var(--t2)",lineHeight:1.55,marginBottom:10}}>{s.notes}</div>
          <div style={{display:"flex",gap:8}}>
            {s.hasVideo&&<button className="btn-ghost" style={{flex:1,fontSize:11,justifyContent:"center"}}>▶ Watch Film</button>}
            <button className="btn-gold" style={{flex:1,fontSize:11,justifyContent:"center"}}>Link to Recruit</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TransferMod = () => (
  <div style={{padding:"22px 26px",overflowY:"auto",height:"100%",display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div><div className="section-h">Transfer Portal</div><div className="section-sub">{TRANSFER_PORTAL.length} Prospects · {TRANSFER_PORTAL.filter(t=>t.status!=="Passed").length} Active · Portal Window Open</div></div>
      <button className="btn-gold">+ Add to Watch</button>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12}}>
      {TRANSFER_PORTAL.map(p=>{
        const sc={Contacted:"var(--gold)","Visit Scheduled":"var(--g)",Monitoring:"var(--b)",Passed:"var(--t3)"};
        return (
          <div key={p.id} className="card" style={{opacity:p.status==="Passed"?.5:1,borderLeft:`3px solid ${sc[p.status]}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div><div style={{fontFamily:"var(--ff-c)",fontSize:18,fontWeight:700}}>{p.name}</div><div style={{fontSize:11,color:"var(--t3)"}}>From: {p.prev}</div></div>
              <div><span className="tag" style={{background:`${sc[p.status]}18`,color:sc[p.status],fontSize:10}}>{p.status}</span><div style={{marginTop:5}}><Stars v={p.rating}/></div></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,marginBottom:10}}>
              {[["Pos",p.pos],["GPA",p.gpa],["Eligibility",p.eligYrs],["Offer",p.offer]].map(([l,v])=>(
                <div key={l} style={{background:"var(--s3)",borderRadius:6,padding:"6px 8px"}}><div style={{fontSize:9,color:"var(--t3)",marginBottom:2}}>{l}</div><div style={{fontSize:12,fontWeight:600,color:"var(--t1)"}}>{v}</div></div>
              ))}
            </div>
            <div style={{fontSize:12,color:"var(--t2)",lineHeight:1.5,marginBottom:10}}>{p.notes}</div>
            {p.status!=="Passed"&&<div style={{display:"flex",gap:8}}><button className="btn-gold" style={{flex:1,fontSize:11,justifyContent:"center"}}>Schedule Visit</button><button className="btn-ghost" style={{flex:1,fontSize:11,justifyContent:"center"}}>Make Offer</button></div>}
          </div>
        );
      })}
    </div>
  </div>
);

const NILMod = () => (
  <div style={{padding:"22px 26px",overflowY:"auto",height:"100%",display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div><div className="section-h">NIL Management</div><div className="section-sub">Name · Image · Likeness · NCAA Compliance</div></div>
      <button className="btn-gold">+ Log Deal</button>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
      {[{lbl:"Active Deals",val:NIL_DEALS.filter(d=>d.status==="Active").length,c:"var(--g)"},{lbl:"Total Value",val:`$${NIL_DEALS.reduce((a,d)=>a+d.value,0).toLocaleString()}`,c:"var(--gold)"},{lbl:"Pending Review",val:NIL_DEALS.filter(d=>d.status==="Pending Review").length,c:"var(--r)"},{lbl:"Compliance",val:"80%",c:"var(--b)"}].map((k,i)=>(
        <div key={i} className="kpi"><div className="kpi-lbl">{k.lbl}</div><div className="kpi-val" style={{color:k.c,fontSize:26}}>{k.val}</div></div>
      ))}
    </div>
    <div className="card" style={{padding:0,overflow:"hidden"}}>
      <table className="dt">
        <thead><tr><th>Player</th><th>Brand</th><th>Type</th><th>Value</th><th>Status</th><th>Expires</th><th>NCAA Compliant</th></tr></thead>
        <tbody>{NIL_DEALS.map(d=>(
          <tr key={d.id}>
            <td className="hl">{d.player}</td><td>{d.brand}</td>
            <td><span className="tag td" style={{fontSize:10}}>{d.type}</span></td>
            <td><span style={{fontFamily:"var(--ff-m)",fontSize:13,color:"var(--g)",fontWeight:700}}>${d.value.toLocaleString()}</span></td>
            <td><span className={`tag ${d.status==="Active"?"tg":d.status==="Pending Review"?"ty":"td"}`} style={{fontSize:10}}>{d.status}</span></td>
            <td style={{color:"var(--t3)",fontSize:12}}>{d.expires}</td>
            <td>{d.compliant===true?<span className="tag tg" style={{fontSize:10}}>✓ Compliant</span>:d.compliant===false?<span className="tag tr" style={{fontSize:10}}>✗ Non-Compliant</span>:<span className="tag ty" style={{fontSize:10}}>Pending</span>}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  </div>
);

const AlumniMod = () => (
  <div style={{padding:"22px 26px",overflowY:"auto",height:"100%",display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div><div className="section-h">Alumni & Donors</div><div className="section-sub">{DONORS.length} Active Donors · ${DONORS.reduce((a,d)=>a+d.total,0).toLocaleString()} Total Committed</div></div>
      <button className="btn-gold">+ Add Donor</button>
    </div>
    <div className="card" style={{padding:0,overflow:"hidden"}}>
      <table className="dt">
        <thead><tr><th>Donor</th><th>Level</th><th>Total Given</th><th>Last Gift</th><th>Amount</th><th>Focus</th><th>Next Contact</th></tr></thead>
        <tbody>{DONORS.map(d=>{
          const lc={"Platinum":"#E5C100","Gold":"var(--o)","Silver":"var(--t2)"};
          return (
            <tr key={d.id}>
              <td className="hl">{d.name}</td>
              <td><span style={{fontSize:12,fontWeight:700,color:lc[d.level]}}>{d.level}</span></td>
              <td><span style={{fontFamily:"var(--ff-m)",fontSize:12,color:"var(--g)",fontWeight:600}}>${d.total.toLocaleString()}</span></td>
              <td style={{color:"var(--t3)",fontSize:12}}>{d.lastGift}</td>
              <td><span style={{fontFamily:"var(--ff-m)",fontSize:12}}>${d.amt.toLocaleString()}</span></td>
              <td><span className="tag td" style={{fontSize:10}}>{d.focus}</span></td>
              <td style={{color:"var(--b)",fontWeight:600,fontSize:12}}>{d.nextContact}</td>
            </tr>
          );
        })}</tbody>
      </table>
    </div>
  </div>
);

const ScheduleMod = () => {
  const played=SCHEDULE.filter(g=>g.result);
  return (
    <div style={{padding:"22px 26px",overflowY:"auto",height:"100%",display:"flex",flexDirection:"column",gap:16}}>
      <div><div className="section-h">Schedule & Results</div><div className="section-sub">{played.length} Played · 13W–5L–2D · GF: {played.reduce((a,g)=>a+g.gf,0)} · GA: {played.reduce((a,g)=>a+g.ga,0)}</div></div>
      <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:16}}>
        <div>
          <div style={{fontSize:10,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".8px",fontFamily:"var(--ff-c)",marginBottom:8}}>Results</div>
          {played.map(g=>(
            <div key={g.id} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",background:"var(--s2)",border:`1px solid ${g.result==="W"?"rgba(34,197,94,.2)":g.result==="L"?"rgba(255,68,68,.2)":"rgba(255,184,28,.2)"}`,borderRadius:8,marginBottom:6,borderLeft:`3px solid ${g.result==="W"?"var(--g)":g.result==="L"?"var(--r)":"var(--gold)"}`}}>
              <div style={{width:26,height:26,borderRadius:5,background:`${g.result==="W"?"var(--g)":g.result==="L"?"var(--r)":"var(--gold)"}18`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--ff-h)",fontSize:15,color:g.result==="W"?"var(--g)":g.result==="L"?"var(--r)":"var(--gold)",flexShrink:0}}>{g.result}</div>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:"var(--t1)"}}>{g.home?"vs":"@"} {g.opp}</div><div style={{fontSize:10,color:"var(--t3)"}}>{g.date} · {g.conf?"ACC":"Non-Conf"}</div></div>
              <div style={{fontFamily:"var(--ff-h)",fontSize:20,letterSpacing:2,color:"var(--t1)"}}>{g.gf}–{g.ga}</div>
            </div>
          ))}
        </div>
        <div>
          <div style={{fontSize:10,color:"var(--t3)",textTransform:"uppercase",letterSpacing:".8px",fontFamily:"var(--ff-c)",marginBottom:8}}>Upcoming</div>
          {SCHEDULE.filter(g=>!g.result).map(g=>(
            <div key={g.id} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",background:"var(--s2)",border:"1px solid var(--bd2)",borderRadius:8,marginBottom:6}}>
              <div style={{width:26,height:26,borderRadius:5,background:"var(--s4)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>📅</div>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:"var(--t1)"}}>{g.home?"vs":"@"} {g.opp}</div><div style={{fontSize:10,color:"var(--t3)"}}>{g.date} · {g.conf?"ACC":"Non-Conf"}</div></div>
              <span className="tag td" style={{fontSize:9}}>{g.home?"HOME":"AWAY"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   ACCESS DENIED
   ============================================================ */
const AccessDenied = ({module}) => (
  <div style={{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16}}>
    <div style={{width:64,height:64,borderRadius:16,background:"rgba(255,68,68,.1)",border:"1px solid rgba(255,68,68,.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--r)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
    </div>
    <div style={{textAlign:"center"}}>
      <div style={{fontFamily:"var(--ff-h)",fontSize:24,letterSpacing:1,color:"var(--r)",marginBottom:4}}>Access Restricted</div>
      <div style={{fontSize:13,color:"var(--t3)"}}>You don't have permission to view <strong style={{color:"var(--t2)"}}>{module}</strong>.</div>
      <div style={{fontSize:12,color:"var(--t3)",marginTop:4}}>Contact your Head Coach to request access.</div>
    </div>
  </div>
);

/* ============================================================
   MODULE: MARKETING / MEDIA
   ============================================================ */
const MarketingMod = () => {
  const socialStats = [
    {platform:"Instagram",followers:"12.4K",growth:"+8.2%",engRate:"4.1%",color:"#E1306C"},
    {platform:"Twitter/X",followers:"6.8K",growth:"+3.1%",engRate:"2.7%",color:"#1DA1F2"},
    {platform:"TikTok",followers:"9.2K",growth:"+22%",engRate:"6.8%",color:"#69C9D0"},
    {platform:"YouTube",followers:"2.1K",growth:"+5.4%",engRate:"3.2%",color:"#FF0000"},
  ];
  const campaigns = [
    {name:"Spring ID Camp – Instagram",status:"Active",budget:1200,spent:840,leads:18,cpl:46.7},
    {name:"Season Recap Video – YouTube",status:"Active",budget:500,spent:500,leads:0,cpl:null},
    {name:"NIL Showcase – TikTok",status:"Paused",budget:800,spent:320,leads:9,cpl:35.6},
    {name:"Youth Camp Email Blast",status:"Completed",budget:200,spent:200,leads:12,cpl:16.7},
  ];
  return (
    <div style={{padding:"22px 26px",overflowY:"auto",height:"100%",display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div className="section-h">Marketing & Media</div><div className="section-sub">Brand · Social Media · Campaigns · Fan Engagement</div></div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn-ghost" style={{fontSize:12}}>Export Report</button>
          <button className="btn-gold" style={{fontSize:12}}>+ New Campaign</button>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
        {[
          {lbl:"Total Social Followers",val:"30.5K",sub:"+9.8% this month",color:"var(--gold)"},
          {lbl:"Avg Engagement Rate",val:"4.2%",sub:"Above D1 avg (2.8%)",color:"var(--g)"},
          {lbl:"Active Campaigns",val:campaigns.filter(c=>c.status==="Active").length,sub:"Across all platforms",color:"var(--b)"},
          {lbl:"Total Camp Leads",val:campaigns.reduce((a,c)=>a+c.leads,0),sub:"From paid channels",color:"var(--o)"},
        ].map((k,i)=>(
          <div key={i} className="kpi"><div className="kpi-lbl">{k.lbl}</div><div className="kpi-val" style={{color:k.color,fontSize:26}}>{k.val}</div><div className="kpi-sub">{k.sub}</div></div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div className="card">
          <div style={{fontSize:12,fontWeight:700,color:"var(--t1)",fontFamily:"var(--ff-c)",textTransform:"uppercase",letterSpacing:".8px",marginBottom:14}}>Social Media Channels</div>
          {socialStats.map((s,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:"1px solid var(--bd)"}}>
              <div style={{width:32,height:32,borderRadius:8,background:`${s.color}20`,border:`1px solid ${s.color}40`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <div style={{width:12,height:12,borderRadius:"50%",background:s.color}}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:12,fontWeight:700,color:"var(--t1)"}}>{s.platform}</div>
                <div style={{fontSize:10,color:"var(--t3)"}}>Eng. Rate: <span style={{color:s.color,fontWeight:600}}>{s.engRate}</span></div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontFamily:"var(--ff-m)",fontSize:14,color:"var(--t1)",fontWeight:700}}>{s.followers}</div>
                <div style={{fontSize:10,color:"var(--g)",fontWeight:600}}>{s.growth}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <div style={{fontSize:12,fontWeight:700,color:"var(--t1)",fontFamily:"var(--ff-c)",textTransform:"uppercase",letterSpacing:".8px",marginBottom:14}}>Active Campaigns</div>
          {campaigns.map((c,i)=>(
            <div key={i} style={{padding:"10px 0",borderBottom:"1px solid var(--bd)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                <div style={{fontSize:12,fontWeight:700,color:"var(--t1)",flex:1,marginRight:8}}>{c.name}</div>
                <span className={`tag ${c.status==="Active"?"tg":c.status==="Paused"?"ty":"td"}`} style={{fontSize:9,flexShrink:0}}>{c.status}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--t3)",marginBottom:5}}>
                <span>Budget: <span style={{fontFamily:"var(--ff-m)",color:"var(--t2)"}}>${c.budget}</span></span>
                <span>Spent: <span style={{fontFamily:"var(--ff-m)",color:"var(--gold)"}}>${c.spent}</span></span>
                {c.cpl&&<span>CPL: <span style={{fontFamily:"var(--ff-m)",color:"var(--g)"}}>${c.cpl.toFixed(0)}</span></span>}
              </div>
              <div className="pbar" style={{height:4}}>
                <div className="pfill" style={{width:`${Math.min((c.spent/c.budget)*100,100)}%`,background:c.spent>=c.budget?"var(--r)":"var(--gold)"}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   MODULE: SPORTS INFORMATION
   ============================================================ */
const SportsInfoMod = () => {
  const mediaItems = [
    {type:"Press Release",title:"Pitt Women's Soccer Signs Top Recruit Mattie Caldwell",date:"Jan 10, 2025",status:"Published",platform:"pittsburghpanthers.com"},
    {type:"Game Notes",title:"Pitt vs Syracuse – Jan 25 Game Notes",date:"Jan 22, 2025",status:"Draft",platform:"ACC Distribution"},
    {type:"Stat Report",title:"2024 Season Final Statistical Report",date:"Jan 5, 2025",status:"Published",platform:"NCAA / ACC"},
    {type:"Bio Update",title:"Talyn Guthrie – Player Bio Update",date:"Dec 30, 2024",status:"Pending",platform:"pittsburghpanthers.com"},
  ];
  const statLeaders = [...ROSTER].sort((a,b)=>b.goals-a.goals).slice(0,5);
  return (
    <div style={{padding:"22px 26px",overflowY:"auto",height:"100%",display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div className="section-h">Sports Information</div><div className="section-sub">Media · Press Releases · Stats · Player Bios</div></div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn-ghost" style={{fontSize:12}}>Game Notes Template</button>
          <button className="btn-gold" style={{fontSize:12}}>+ New Release</button>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
        {[
          {lbl:"Published This Month",val:mediaItems.filter(m=>m.status==="Published").length,color:"var(--g)"},
          {lbl:"Drafts Pending",val:mediaItems.filter(m=>m.status==="Draft"||m.status==="Pending").length,color:"var(--gold)"},
          {lbl:"Total Season Apps",val:ROSTER.reduce((a,p)=>a+p.apps,0),color:"var(--b)"},
          {lbl:"Goals This Season",val:ROSTER.reduce((a,p)=>a+p.goals,0),color:"var(--o)"},
        ].map((k,i)=>(
          <div key={i} className="kpi"><div className="kpi-lbl">{k.lbl}</div><div className="kpi-val" style={{color:k.c||k.color,fontSize:28}}>{k.val}</div></div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:14}}>
        <div className="card" style={{padding:0,overflow:"hidden"}}>
          <div style={{padding:"12px 16px",borderBottom:"1px solid var(--bd)",fontSize:12,fontWeight:700,color:"var(--t1)",fontFamily:"var(--ff-c)",textTransform:"uppercase",letterSpacing:".8px"}}>Media & Press Queue</div>
          <table className="dt">
            <thead><tr><th>Type</th><th>Title</th><th>Date</th><th>Status</th><th>Platform</th><th>Action</th></tr></thead>
            <tbody>{mediaItems.map((m,i)=>(
              <tr key={i}>
                <td><span className="tag td" style={{fontSize:9}}>{m.type}</span></td>
                <td className="hl" style={{maxWidth:200,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{m.title}</td>
                <td style={{color:"var(--t3)",fontSize:12}}>{m.date}</td>
                <td><span className={`tag ${m.status==="Published"?"tg":m.status==="Draft"?"ty":"tb"}`} style={{fontSize:9}}>{m.status}</span></td>
                <td style={{color:"var(--t3)",fontSize:11}}>{m.platform}</td>
                <td><button className="btn-ghost" style={{fontSize:10,padding:"3px 9px"}}>{m.status==="Published"?"View":"Edit"}</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div className="card">
          <div style={{fontSize:12,fontWeight:700,color:"var(--t1)",fontFamily:"var(--ff-c)",textTransform:"uppercase",letterSpacing:".8px",marginBottom:12}}>Season Stat Leaders</div>
          {statLeaders.map((p,i)=>(
            <div key={p.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid var(--bd)"}}>
              <div style={{width:22,height:22,borderRadius:5,background:"var(--gold)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--ff-h)",fontSize:12,color:"#000",flexShrink:0}}>{i+1}</div>
              <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:"var(--t1)"}}>{p.name}</div><div style={{fontSize:10,color:"var(--t3)"}}>{p.pos} · {p.apps} apps</div></div>
              <div style={{textAlign:"right",fontFamily:"var(--ff-m)"}}>
                <span style={{fontSize:14,color:"var(--g)",fontWeight:700}}>{p.goals}G</span>
                <span style={{fontSize:11,color:"var(--b)",marginLeft:6}}>{p.assists}A</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   TITLE / SUB CONFIG
   ============================================================ */
const META = {
  dashboard:{t:"COMMAND CENTER",s:`${PROGRAM.school} · ${PROGRAM.div} · ${PROGRAM.season}`},
  roster:{t:"ROSTER",s:"Active roster · Eligibility · Academic standing"},
  scholarship:{t:"SCHOLARSHIP BUDGET",s:"NCAA cap tracker · Drag-to-pitch builder · EQ scenarios"},
  programbudget:{t:"PROGRAM BUDGET",s:"Revenue · Expenses · P&L · FY2024–25 fiscal overview"},
  recruiting:{t:"RECRUITING PIPELINE",s:"Prospects · Offers · Campus visits"},
  depthchart:{t:"DEPTH CHART",s:"Formation builder · Scholarship overlay"},
  schedule:{t:"SCHEDULE & RESULTS",s:"Match results · Upcoming fixtures"},
  staff:{t:"STAFF & TASKS",s:"Accountability · KPIs · Task management"},
  transfer:{t:"TRANSFER PORTAL",s:"Portal monitoring · Offers · Eligibility"},
  nil:{t:"NIL MANAGEMENT",s:"Deals · Compliance · Value tracking"},
  sportsscience:{t:"SPORTS SCIENCE",s:"Load monitoring · Catapult · Readiness"},
  medical:{t:"MEDICAL & INJURY",s:"Injury log · Return-to-play · Risk"},
  scouting:{t:"SCOUTING & FILM",s:"Film notes · Event reports · Ratings"},
  alumni:{t:"ALUMNI & DONORS",s:"Donor CRM · Giving history · Engagement"},
  development:{t:"PLAYER DEVELOPMENT",s:"IDPs · Technical metrics · Progress"},
  academics:{t:"ACADEMICS",s:"NCAA eligibility · GPA · Study hall · Advising"},
  camps:{t:"CAMPS & CLINICS",s:"Registration · Ryzer · Marketing insights"},
  marketing:{t:"MARKETING & MEDIA",s:"Social · Campaigns · Brand · Fan engagement"},
  sportsinfo:{t:"SPORTS INFORMATION",s:"Press releases · Stats · Player bios · Media"},
};

/* ============================================================
   APP ROOT
   ============================================================ */
export default function App() {
  const [user,setUser]=useState(null);
  const [active,setActive]=useState("dashboard");
  const [editMode,setEditMode]=useState(false);
  const appData = useAppData();

  const handleLogin=(acc)=>{
    setUser(acc);
    // Auto-navigate to first accessible module for restricted roles
    const role=ROLES[acc.role];
    if(role?.modules&&role.modules!=="*"&&!role.modules.includes("dashboard")){
      setActive(role.modules[0]);
    } else {
      setActive("dashboard");
    }
  };

  if(!user) return (<><GlobalStyles/><Login onLogin={handleLogin}/></>);

  const MODS = {
    dashboard:<Dashboard/>,roster:<RosterMod/>,scholarship:<ScholarshipMod/>,
    programbudget:<ProgramBudgetMod/>,
    recruiting:<RecruitMod/>,depthchart:<DepthMod/>,schedule:<ScheduleMod/>,
    staff:<StaffMod/>,transfer:<TransferMod/>,nil:<NILMod/>,
    sportsscience:<ScienceMod/>,medical:<MedicalMod/>,scouting:<ScoutMod/>,
    alumni:<AlumniMod/>,development:<DevelopmentMod/>,academics:<AcademicsMod/>,
    camps:<CampsMod/>,marketing:<MarketingMod/>,sportsinfo:<SportsInfoMod/>,
  };

  const meta=META[active]||{t:active.toUpperCase(),s:""};
  const hasAccess=canAccess(user.role,active);

  return (
    <AppDataContext.Provider value={{...appData, editMode, setEditMode}}>
      <GlobalStyles/>
      <div style={{display:"flex",height:"100vh",overflow:"hidden",background:"var(--bg)"}}>
        <Sidebar active={active} setActive={setActive} user={user} onLogout={()=>setUser(null)}/>
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <TopBar title={meta.t} sub={meta.s} editMode={editMode} setEditMode={setEditMode} userRole={user.role}/>
          <div style={{flex:1,overflow:"hidden"}} className="fade-in" key={active}>
            {hasAccess ? (MODS[active]||<div style={{padding:40,color:"var(--t3)"}}>Module coming soon.</div>) : <AccessDenied module={meta.t}/>}
          </div>
        </div>
      </div>
      <EditBanner editMode={editMode} setEditMode={setEditMode}/>
    </AppDataContext.Provider>
  );
}
