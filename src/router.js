import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import Loadable from 'react-loadable'

import Loader from 'components/LayoutComponents/Loader'
import IndexLayout from 'layouts'
import NotFoundPage from 'pages/404'

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader />,
  })

const routes = [
  // New Routes

  {
    path: '/dashboard',
    component: loadable(() => import('pages/dashboard/home')),
    exact: true,
  },
  {
    path: '/template',
    component: loadable(() => import('pages/template')),
    exact: true,
  },
  {
    path: '/settings/billing',
    component: loadable(() => import('pages/settings/billing')),
    exact: true,
  },
  {
    path: '/template/create',
    component: loadable(() => import('pages/template/create')),
    exact: true,
  },
  {
    path: '/certificates',
    component: loadable(() => import('pages/certificates')),
    exact: true,
  },
  //landing Page
  {
    path: '/landingpage/one',
    component: loadable(() => import('pages/landingpage/one')),
    exact: true,
  },
  {
    path: '/upload/exl',
    component: loadable(() => import('pages/upload/exl')),
    exact: true,
  },


  //Home
  {
    path: '/home',
    component: loadable(() => import('pages/home')),
    exact: true,
  },

  //Bdoc Verification
  {
    path: '/bdoc/verify',
    component: loadable(() => import('pages/bdoc/verify')),
    exact: true,
  },

  //Bdoc Details
  {
    path: '/bdoc/view',
    component: loadable(() => import('pages/bdoc/view')),
    exact: true,
  },

  //Certificates
  {
    path: '/studentcert',
    component: loadable(() => import('pages/studentcert')),
    exact: true,
  },

  // End New Routes

  // System Pages
  {
    path: '/user/login',
    component: loadable(() => import('pages/user/login')),
    exact: true,
  },
  {
    path: '/user/forgot',
    component: loadable(() => import('pages/user/forgot')),
    exact: true,
  },

]

class Router extends React.Component {
  render() {
    const { history } = this.props
    return (
      <ConnectedRouter history={history}>
        <IndexLayout>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            {routes.map(route => (
              <Route
                path={route.path}
                component={route.component}
                key={route.path}
                exact={route.exact}
              />
            ))}
            <Route component={NotFoundPage} />
          </Switch>
        </IndexLayout>
      </ConnectedRouter>
    )
  }
}

export default Router
