import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout.js";
import AdminLayout from "./layouts/AdminLayout.js";
import Head from "next/head";

export default function Home() {
	return (
		<HashRouter>
			<Head>
				<title>GHIRAH</title>
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/favicon.ico"></link>
				<meta name="theme-color" content="#fff" />
				<meta name="description" content="Aplikasi Masjid"/>
			</Head>
			<Switch>
				<Route path={`/admin`} component={AdminLayout} />
				<Route path={`/`} component={AuthLayout} />
				<Redirect from={`/admin`} to="/admin/dashboard" />
			</Switch>
		</HashRouter>
	)
}
