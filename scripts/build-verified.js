#!/usr/bin/env node
const {spawn} = require('child_process');
const fs = require('fs');
const path = require('path');

(async function main(){
  const projectRoot = path.resolve(__dirname, '..');
  const runtimeRoot = process.env.SITES_RUNTIME_ROOT || path.join(projectRoot, '.sites-runtime');

  // create runtime dirs
  const dirs = ['home','npm-cache','xdg-config','tmp','wrangler/logs'].map(d=>path.join(runtimeRoot,d));
  for(const d of dirs){
    fs.mkdirSync(d,{recursive:true});
  }

  // export envs for child
  const env = Object.assign({}, process.env, {
    SITES_ENV_READY: '1',
    SITES_PROJECT_ROOT: projectRoot,
    HOME: path.join(runtimeRoot,'home'),
    XDG_CONFIG_HOME: path.join(runtimeRoot,'xdg-config'),
    TMPDIR: path.join(runtimeRoot,'tmp'),
    WRANGLER_WRITE_LOGS: 'false',
    WRANGLER_LOG_PATH: path.join(runtimeRoot,'wrangler','logs'),
    MINIFLARE_REGISTRY_PATH: path.join(runtimeRoot,'wrangler','registry'),
    npm_config_cache: path.join(runtimeRoot,'npm-cache'),
    npm_config_audit: 'false',
    npm_config_fund: 'false',
    npm_config_update_notifier: 'false'
  });

  // remove npm proxy env aliases if present
  ['npm_config_proxy','npm_config_http_proxy','npm_config_https_proxy','NPM_CONFIG_PROXY','NPM_CONFIG_HTTP_PROXY','NPM_CONFIG_HTTPS_PROXY'].forEach(k=>{ delete env[k]; });

  // locate vinext binary in node_modules/.bin
  const binDir = path.join(projectRoot,'node_modules','.bin');
  let vinext = path.join(binDir,'vinext');
  if (process.platform === 'win32' && !fs.existsSync(vinext)) {
    const alt = vinext + '.cmd';
    if (fs.existsSync(alt)) vinext = alt;
  }

  if (!fs.existsSync(vinext)){
    console.error('vinext is unavailable. Run npm run install:ci and wait for it to finish before building.');
    process.exit(69);
  }

  console.log('Running bounded vinext build...');

  // timeout defaults
  const buildTimeout = parseDuration(env.SITES_BUILD_TIMEOUT || '3m');
  const killAfter = parseDuration(env.SITES_BUILD_KILL_AFTER || '10s');

  const child = spawn(vinext, ['build'], {env, stdio: 'inherit', shell: false});

  const killTimer = setTimeout(()=>{
    try{
      child.kill('SIGTERM');
    }catch(e){}
    // schedule force kill
    setTimeout(()=>{ try{ child.kill('SIGKILL'); }catch(e){} }, killAfter);
  }, buildTimeout);

  child.on('exit',(code,signal)=>{
    clearTimeout(killTimer);
    if(signal){
      console.error(`vinext build terminated with signal ${signal}`);
      process.exit(1);
    }
    process.exit(code);
  });

  function parseDuration(s){
    // accepts formats like '3m', '10s', or milliseconds number
    if(!s) return 180000;
    if(/^[0-9]+$/.test(s)) return parseInt(s,10);
    const m = /^([0-9]+)s$/.exec(s);
    if(m) return parseInt(m[1],10)*1000;
    const mm = /^([0-9]+)m$/.exec(s);
    if(mm) return parseInt(mm[1],10)*60*1000;
    return 180000;
  }

})();
