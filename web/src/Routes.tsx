// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, PrivateSet } from '@redwoodjs/router'

import AppLayout from 'src/layouts/AppLayout/AppLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/oops" page={NotFoundPage} name="oops" />

      <PrivateSet unauthenticated="login">
        <Set wrap={AppLayout}>
          <Route path="/" page={HomePage} name="home" />
          <Route path="/budget/{budget}" page={BudgetPage} name="budget" />
          <Route path="/budget/{budget}/account/{account}" page={AccountPage} name="account" />
        </Set>
      </PrivateSet>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
