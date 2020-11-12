export async function asyncFunction(returnObject, delay){  
  await new Promise((res)=>setTimeout(()=>res(returnObject),delay))
}