let navbar = document.getElementById('navbar')

navbar.insertAdjacentHTML('afterbegin',`  <div id="navbar"></div>


<nav class="navbar navbar-dark bg-dark" aria-label="First navbar example">
 <div class="container-fluid">
   <a class="navbar-brand" href="#">Near earth object warning system</a>
   <button
     class="navbar-toggler"
     type="button"
     data-bs-toggle="collapse"
     data-bs-target="#navbarsExample01"
     aria-controls="navbarsExample01"
     aria-expanded="false"
     aria-label="Toggle navigation"
   >
     <span class="navbar-toggler-icon"></span>
   </button>
 
   <div class="collapse navbar-collapse" id="navbarsExample01">
     <ul class="navbar-nav me-auto mb-2">
       <li class="nav-item">
         <a
           class="nav-link active"
           aria-current="page"
           href="../index.html"
           >Home</a
         >
       </li>
       <li class="nav-item">
         <a class="nav-link" href="../HTML/impact.html">NEO Navigation</a>
       </li>

       <li class="nav-item dropdown">
         <a
           class="nav-link dropdown-toggle"
           href="#"
           id="dropdown01"
           data-bs-toggle="dropdown"
           aria-expanded="false"
           >Admin</a
         >
         <ul class="dropdown-menu" aria-labelledby="dropdown01">
           <li><a class="dropdown-item" href="#">Username:<input type="text"></a></li>
           <li><a class="dropdown-item" href="#">Password:<input type="text"></a></li>
           <li>
             <a class="dropdown-item" href="#"><button id="loginbtn">Login</button></a>
           </li>
         </ul>
       </li>
     </ul>
     <form>
       <input
         class="form-control"
         type="text"
         placeholder="Search"
         aria-label="Search"
       />
     </form>
   </div>
 </div>
 </nav>`)