// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/" page={HomePage} name="home" />
      <Set wrap={ScaffoldLayout} title="Transactions" titleTo="transactions" buttonLabel="New Transaction" buttonTo="newTransaction">
        <Route path="/transactions/new" page={TransactionNewTransactionPage} name="newTransaction" />
        <Route path="/transactions/{id:Int}/edit" page={TransactionEditTransactionPage} name="editTransaction" />
        <Route path="/transactions/{id:Int}" page={TransactionTransactionPage} name="transaction" />
        <Route path="/transactions" page={TransactionTransactionsPage} name="transactions" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
