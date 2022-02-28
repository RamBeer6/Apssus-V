// import { AppHeader } from './js/cmps/AppHeader.jsx';
import { Home } from './js/pages/Home.jsx';
import { About } from './js/pages/About.jsx';
import { BookMain } from './js/apps/book/BookMain.jsx';
import { MailMain } from './js/apps/mail/pages/MailMain.jsx';
import { KeepApp } from './js/apps/keep/pages/KeepApp.jsx';
import { ComposeMail } from './js/apps/mail/pages/ComposeMail.jsx';
import { MailDetails } from './js/apps/mail/pages/MailDetails.jsx';

// import { BookDetails } from './js/apps/book/pages/BookDetails.jsx';

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export function App() {
  return (
    <Router>
      <section className='app'>
        {/* <AppHeader /> */}
        <main>
          <Switch>
            <Route component={BookMain} path='/book' />
            <Route component={About} path='/about' />
            <Route component={KeepApp} path='/keep' />
            {/* <Route
              path='/mail/new-compose/:action?/:emailId?'
              component={MailCompose}
            /> */}
            <Route component={MailMain} path='/mail/:mailId' />
            <Route component={MailMain} path='/mail' />

            <Route component={Home} path='/' />
          </Switch>
        </main>
      </section>
    </Router>
  );
}
