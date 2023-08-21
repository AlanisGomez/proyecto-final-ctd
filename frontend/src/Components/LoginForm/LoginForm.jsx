import React, { useState } from 'react'
import { useFormik } from 'formik'
import './LoginForm.scss'
import { Link, useNavigate } from 'react-router-dom'
import { LoginSchema } from '../../Schemas/Schemas'

const LoginForm = () => {

  const [credentialError, setCredentialError] = useState("") 

  const navigate = useNavigate()

  const handleSubmitForm = async (values) => {
    try {
      const response = await fetch('http://localhost:8080/v1/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        alert('Login exitoso');
        const data = await response.json();
        const userId = data.userId;
        const token = data.token;
        const isAdmin = data.isAdmin;
        navigate('/')
        
        console.log(`userId: ${userId} `);
        console.log(`token: ${token} `);
        console.log(`isAdmin: ${isAdmin} `);
      } else {
        setCredentialError("Credenciales invalidas");
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  }

  const { handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleSubmitForm(values)
    },
    validationSchema: LoginSchema
  })

  return (
    <div className='login-form-container'>
      <h1 className='mb-5'>Bienvenid@</h1>
      <form className="row g-3 login-form" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            onChange={handleChange}
            type="email"
            className="form-control"
            id="email"
            name="email"
          />
        </div>
        <div className="col-12">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            onChange={handleChange}
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <div className="col-12 btn-register">
          <button type="submit" className="btn btn-dark">Iniciar Sesion</button>
          <p>No tienes cuenta? <Link to="/register">Registrate</Link> </p>
        </div>
        <div>
          {errors.email && <p className='error'>{errors.email}</p>}
          {errors.password && <p className='error'>{errors.password}</p>}
          {credentialError && <p className='error'>{credentialError}</p>}
        </div>
      </form>
    </div>
  )
}

export default LoginForm