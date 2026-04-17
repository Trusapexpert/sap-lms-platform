self.addEventListener("install", e=>{
e.waitUntil(
caches.open("sap").then(cache=>{
return cache.addAll(["/"]);
})
);
});
