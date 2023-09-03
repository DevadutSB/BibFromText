const puppeteer   = require('puppeteer');
const {
    readFileSync,
    writeFileSync} = require('fs')

const input_path  = "./ref.txt"
const output_path = "./ref.bib"

let refs  = readFileSync(input_path,{encoding:'utf-8',flag:'r'}).split('\n')
let total = refs.length

function progress(c,start,end){
    process.stdout.write('\x1Bc');
    let time  =  new Date(((total-c)*(end-start)) + new Date().getTime()).toLocaleString();
    let per   = c*100/total
    process.stdout.write(`${per.toFixed(3)}%, End time : ${time} (${c} papers cited out of ${total})`);
}

async function click(tab,sel){
    await tab.waitForSelector(sel)
    await tab.click(sel)
}

async function cite(tab,refer){
    await tab.goto('https://scholar.google.com/')
    await tab.type('#gs_hdr_tsi',refer)
    await tab.waitForSelector('#gs_hdr_tsb')
    await tab.click('#gs_hdr_tsb')
    await click(tab,'#gs_hdr_tsb')
    await click(tab,'#gs_res_ccl_mid > div > div.gs_ri > div.gs_fl.gs_flb > a.gs_or_cit.gs_or_btn.gs_nph')
    await click(tab,'#gs_citi > a:nth-child(1)')
    let cite = await tab.evaluate(()=>document.body.innerText)
    return cite
}

(async ()=>{

    let c=1,start=0,end=0;
    let cite_arr = []

    const Browser = await puppeteer.launch({
        "headless":false,
        "args": [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-accelerated-2d-canvas",
            "--no-first-run",
            "--no-zygote",
            "--disable-gpu"
        ]
    })

    const tab   = await Browser.newPage()

    for(const ref of refs){
        start = new Date().getTime() 
        let bib = await cite(tab,ref)
        end = new Date().getTime() 
        progress(c,start,end)
        cite_arr.push(bib)
        c+=1
    }

    writeFileSync(output_path,cite_arr.join("\n\n"))
    console.log(output_path,"written")
    await Browser.close()
})()
