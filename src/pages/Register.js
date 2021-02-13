
// import '../App.css';

// export function Register() {
//   return (
//     <div className="App">
//       <h1>Register</h1>
//     </div>
//   )
// }


export function Register({ email,  password, handleChage, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input 
        type="email"
        id="email"
        name="email"
        onChange={handleChage}
        value={email}
        required
      />

      <label htmlFor="password">Password</label>
      <input 
        type="password"
        id="password"
        name="password"
        onChange={handleChage}
        value={password}
        required
      />
      <button>Register</button>
    </form>
  )
}