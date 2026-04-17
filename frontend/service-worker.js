self.addEventListener("install",e=>{
e.waitUntil(
caches.open("sap").then(cache=>cache.addAll(["/"]))
);
});
