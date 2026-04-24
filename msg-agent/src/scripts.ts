/*
 * @Author: liulin blue-sky-dl5@163.com
 * @Date: 2025-12-02 11:59:03
 * @LastEditors: liulin blue-sky-dl5@163.com
 * @LastEditTime: 2025-12-23 16:29:02
 * @FilePath: /msg-demo-project/msg-agent/scripts.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { applyCborEncoding, applyParamsToScript, builtinByteString, byteString, deserializeAddress, mConStr0, PlutusScript, policyId, resolvePlutusScriptAddress, resolveScriptHash, serializeAddressObj, SpendingBlueprint } from "@meshsdk/core";
import {defaultConfig} from "./config";
// const demoInboundCompiledCode = defaultConfig.demoInboundCompiledCode;
// provide your staking part for the compiled address
// const stakeHash = "9e8a6e5fcbbb5b84deefc71d7cb6319a3da9cc3d19765efb303647ef";

// const blueprint =  new SpendingBlueprint("V3", 0, '');
// blueprint.paramScript(
//   defaultConfig.demoInbound.compiledCode,
//   [defaultConfig.INBOUND_POLICY],
//   "Mesh" // Mesh data type
// );

// const scriptHash = blueprint.hash;
// const scriptCbor = blueprint.cbor;
// const scriptAddress = blueprint.address;

export function getInboundDemoScript() {
  const oinboundTokenInfo = getInboundTokenScript();
  const scriptCbor = applyParamsToScript(defaultConfig.demoInbound!.compiledCode, [oinboundTokenInfo.policyId]);
  const script: PlutusScript = {
    code: scriptCbor,
    version: defaultConfig.demoInbound!.plutusVersion,
  };
  const scriptAddress = resolvePlutusScriptAddress(script, defaultConfig.NETWORK);
  return { script, scriptAddress };
}

export function getOutboundDemoScript() {
  const outboundTokenInfo = getOutboundTokenScript();
  const scriptCbor = applyParamsToScript(defaultConfig.demoOutbound!.compiledCode, [outboundTokenInfo.policyId]);
  const script: PlutusScript = {
    code: scriptCbor,
    version: defaultConfig.demoOutbound!.plutusVersion,
  };
  const scriptAddress = resolvePlutusScriptAddress(script, defaultConfig.NETWORK);
  return { script, scriptAddress };
}

export function getInboundTokenScript() {
  // const scriptCbor = applyCborEncoding(defaultConfig.inboundToken.compiledCode);
  // const scriptCbor = normalizePlutusScript(defaultConfig.inboundToken.compiledCode);
  const scriptCbor = defaultConfig.inboundToken!.compiledCode;
  const script: PlutusScript = {
    code: scriptCbor,
    version: defaultConfig.inboundToken!.plutusVersion,
  };
  const policyId = resolveScriptHash(scriptCbor, defaultConfig.outboundToken.plutusVersion);
  return { script, policyId };
}

export function getOutboundTokenScript() {
  // const scriptCbor = applyCborEncoding(defaultConfig.outboundToken.compiledCode);
  const scriptCbor = defaultConfig.outboundToken.compiledCode;
  const script: PlutusScript = {
    code: scriptCbor,
    version: defaultConfig.outboundToken.plutusVersion,
  };
  const policyId = resolveScriptHash(scriptCbor, defaultConfig.outboundToken.plutusVersion);
  return { script, policyId };
}

export function getDemoTokenSCript(){
  const {scriptAddress} = getInboundDemoScript();
  const a = deserializeAddress(scriptAddress);
  const scriptCbor = applyParamsToScript(defaultConfig.demoToken.compiledCode, [a.scriptHash,defaultConfig.demoTokenName]);
  const script: PlutusScript = {
    code: scriptCbor,
    version: defaultConfig.demoToken.plutusVersion,
  };
  const policyId = resolveScriptHash(scriptCbor, defaultConfig.demoToken.plutusVersion);
  return { script, policyId };
}


export function getXPortScript(){
  const XPortCBor = '58f358f10101003229800aba2aba1aab9faab9eaab9dab9cab9a488888896600264646644b30013370e900118039baa001899914c004c03000a6018601a0052259800800c528456600266e3cdd71807000801c528c4cc008008c03c005009201a9bac300c300d300d300d300d300d300d300d300d300a3754601800c9111198010010008c020dd50009bae300a3008375401b164014601000260106012002601000260086ea8022293454cc00924011856616c696461746f722072657475726e65642066616c7365001365640044c123d8799f581cb4b75848843d485a3e2f1f95783763afb58009e5ff444cde1dfd3e1902ff0001';
  // const scriptCbor = applyCborEncoding(XPortCBor);
  const script: PlutusScript = {
    code: XPortCBor,
    version: 'V3',
  };
  const scriptAddress = resolvePlutusScriptAddress(script, defaultConfig.NETWORK);
  return { script, scriptAddress };
}
const inboundTokenInfo = getInboundTokenScript();
const outboundTokenInfo = getOutboundTokenScript();
const inboundDemoInfo = getInboundDemoScript();
const outboundDemoInfo = getOutboundDemoScript();
const xportInfo = getXPortScript();
const demoTokenInfo = getDemoTokenSCript();

export default {
  inboundTokenPolicy: inboundTokenInfo.policyId,
  inboundTokenScript: inboundTokenInfo.script,
  outboundTokenPolicy: outboundTokenInfo.policyId,
  outboundTokenScript: outboundTokenInfo.script,
  inboundDemoAddress: inboundDemoInfo.scriptAddress,
  inboundDemoScript: inboundDemoInfo.script,
  outboundDemoScript: outboundDemoInfo.script,
  outboundDemoAddress: outboundDemoInfo.scriptAddress,
  xportScript: xportInfo.script,
  xportAddress: xportInfo.scriptAddress,
  demoTokenPolicy: demoTokenInfo.policyId,
  demoTokenScript: demoTokenInfo.script,
}