(function() {

   var scope = "global";
   var i;

   function ScopeTest()
   {
     alert(scope);
     //var scope = "local";
     alert(scope);
   }
   
   ScopeTest();
   
   for( i = 0; i < 10; i++ ) {
     setTimeout(
       (function(x) { 
         return function() { console.log(x) }})(i), 100);
   }
   
   
   
   
   
})();