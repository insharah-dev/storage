const projectUrl = 'https://nsvbxmhwoncpxmqfsdab.supabase.co';
const projectKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zdmJ4bWh3b25jcHhtcWZzZGFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMjQzOTAsImV4cCI6MjA2ODcwMDM5MH0.mVyqnlyV2cQx3laoXqxvHFpRcAwSsjvHvIbHTc9675A';
const { createClient } = supabase;
const client = createClient(projectUrl, projectKey)

console.log(createClient);
console.log(client);

const signupBtn = document.getElementById('signupBtn')

signupBtn && signupBtn.addEventListener('click', async () => {

  const full_name = document.getElementById('full_name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const profile_pic = document.getElementById('profile_pic').files[0]

  console.log(full_name, email, password, profile_pic);
const fileEx = profile_pic.name.split('.')[1]
console.log(fileEx);


  const {data:{user} ,error}= await client.auth.getUser();
  console.log(user.id);
  

  if (email && password) {
    try {
      const { data:userauth, error } = await client.auth.signUp({
        email: email,
        password: password,
      });
      console.log(userauth);
      // if (data) {
      //   Swal.fire({
      //     title: "Account created successfully! Redirecting to post page...",
      //     icon: "success",
      //     draggable: true,
      //   });
      // }
      // setInterval(() => {
      //   window.location.href = "post.html";
      // }, 2000);

      if (userauth) {

        const { data:profileURl, error } = await client.storage.from('users-profiles').upload(`avatars/user-${user.id}.${fileEx}`, profile_pic ,{
  upsert: true,
})
        console.log(profileURl);
        
        if (error) {
          console.log(error);
        } else {
          alert('successfullly added.')
          console.log('upload data:', profileURl);
          
// get public url 

const { data } = client
  .storage
  .from('users-profiles')
  .getPublicUrl(`avatars/user-${user.id}.${fileEx}`)

  console.log('public url: ',data);

  // other information in database

  const { error } = await client
  .from('storage')
  .insert({ user_id: user.id, email: email, full_name: full_name, profile_url: profile_pic})
  
  
  console.log("database error..........",error);
  
        }
      }
    }
    catch (error) {
      console.log(error);
      
  //       console.log("signup error:", error);
  // console.log("type:", typeof error);
  // console.log("error.message:", error.message);
  //     if (error.message.includes("invalid format")) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: "please enter a valid email address!",
  //       });
  //     }
  //     if (
  //       error.message.includes("Password should be at least 6 characters.")
  //     ) {
  //       Swal.fire({
  //         icon: "warning",
  //         title: "Oops...",
  //         text: "make sure your password lenght is 6 or greater than 6 characters!",
  //       });
  //     }
  //     if (error.message.includes("User already registered")) {
  //       Swal.fire({
  //         icon: "warning",
  //         title: "Oops...",
  //         text: "This User is already registered. Try logging in instead.",
  //       });
  //     }
  //   }


  // }

  // else {
  //   if (email) {
  //     Swal.fire("please fill the Passsword field.");
  //   } else {
  //     Swal.fire("please fill the Email field.");
    }
  }
});


