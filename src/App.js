import './App.css';
import { Formik } from 'formik';
import { useState } from 'react';
import icon from './images/icon-complete.svg';

const Body = () => {
	const [data, setData] = useState({
		name: '',
		number: '',
		month: '',
		year: '',
		cvc: '',
	});
	return (
		<div className="container">
			<div className="dark">
				<Dark data={data} />
			</div>
			<div className="light">
				<Light setData={setData} />
			</div>
		</div>
	);
};

const Dark = (props) => {
	return (
		<div className="card">
			<div className="back">
				<h5>{props.data.cvc || '000'}</h5>
			</div>
			<div className="front">
				<div className="icon"></div>
				<h3>{props.data.number || '0000 0000 0000 0000'}</h3>
				<div className="info">
					<h5>{props.data.name || 'Jane Appleseed'}</h5>
					<div>
						<h5>
							<p>{props.data.month || '00'}</p>
							<p>/</p>
							<p>{props.data.year || '00'}</p>
						</h5>
					</div>
				</div>
			</div>
		</div>
	);
};

const Light = (props) => {
	const [isFinished, setIsFinished] = useState(false);
	return isFinished ? (
		<Complete setIsFinished={setIsFinished} />
	) : (
		<Form setIsFinished={setIsFinished} setData={props.setData} />
	);
};

const Form = (props) => {
	return (
		<Formik
			initialValues={{
				name: '',
				number: '',
				month: '',
				year: '',
				cvc: '',
			}}
			validate={(values) => {
				const errors = {};
				if (!values.name) {
					errors.name = `Can't be blank`;
				}
				if (!values.number) {
					errors.number = `Can't be blank`;
				} else if (!/^\d{4} *\d{4} *\d{4} *\d{4}$/g.test(values.number)) {
					errors.number = 'Wrong format';
				}
				if (!values.month) {
					errors.month = `Can't be blank`;
				} else if (!/^(0?[1-9]|1[012])$/.test(values.month)) {
					errors.month = 'Wrong format';
				}
				if (!values.year) {
					errors.year = `Can't be blank`;
				} else if (!/^\d{2}$/.test(values.year)) {
					errors.year = 'Wrong format';
				}
				if (!values.cvc) {
					errors.cvc = `Can't be blank`;
				} else if (!/^\d{3}$/.test(values.cvc)) {
					errors.cvc = 'Wrong format';
				}
				return errors;
			}}
			onSubmit={() => props.setIsFinished(true)}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting,
			}) => (
				<form onSubmit={handleSubmit}>
					<div className="field name">
						<label htmlFor="name">Cardholder name</label>
						<input
							type="text"
							name="name"
							id="cardholder-name"
							className={errors.name && touched.name && 'error'}
							placeholder="e.g. Jane Appleseed"
							onChange={(e) => {
								handleChange(e);
								props.setData((oldData) => ({
									...oldData,
									name: e.target.value,
								}));
							}}
							onBlur={handleBlur}
							value={values.name}
						/>
						<p>{errors.name && touched.name && errors.name}</p>
					</div>
					<div className="field number">
						<label htmlFor="number">Card number</label>
						<input
							type="text"
							name="number"
							id="card-number"
							className={errors.number && touched.number && 'error'}
							placeholder="e.g. 1234 5678 9123 0000"
							onChange={(e) => {
								handleChange(e);
								props.setData((oldData) => ({
									...oldData,
									number: e.target.value,
								}));
							}}
							onBlur={handleBlur}
							value={values.number}
						/>
						<p>{errors.number && touched.number && errors.number}</p>
					</div>
					<div className="fields">
						<div className="field date">
							<label htmlFor="month">Exp. Date (MM/YY)</label>
							<input
								type="number"
								name="month"
								id="month"
								className={errors.month && touched.month && 'error'}
								placeholder="MM"
								onChange={(e) => {
									handleChange(e);
									props.setData((oldData) => ({
										...oldData,
										month: e.target.value,
									}));
								}}
								onBlur={handleBlur}
								value={values.month}
							/>
							<input
								type="number"
								name="year"
								id="year"
								className={errors.year && touched.year && 'error'}
								placeholder="YY"
								onChange={(e) => {
									handleChange(e);
									props.setData((oldData) => ({
										...oldData,
										year: e.target.value,
									}));
								}}
								onBlur={handleBlur}
								value={values.year}
							/>
							<p>
								{(errors.month && touched.month && errors.month) ||
									(errors.year && touched.year && errors.year)}
							</p>
						</div>

						<div className="field cvc">
							<label htmlFor="cvc">cvc</label>
							<input
								type="number"
								name="cvc"
								id="cvc"
								className={errors.cvc && touched.cvc && 'error'}
								placeholder="e.g. 123"
								onChange={(e) => {
									handleChange(e);
									props.setData((oldData) => ({
										...oldData,
										cvc: e.target.value,
									}));
								}}
								onBlur={handleBlur}
								value={values.cvc}
							/>
							<p>{errors.cvc && touched.cvc && errors.cvc}</p>
						</div>
					</div>
					<div className="confirm"></div>
					<button type="submit" id="confirm" disabled={isSubmitting}>
						Confirm
					</button>
				</form>
			)}
		</Formik>
	);
};

const Complete = (props) => {
	return (
		<div className="complete">
			<div className="icon-complete">
				<img src={icon} alt="icon-complete" />
			</div>
			<h1>Thank you!</h1>
			<h2>We've added your card details</h2>
			<button
				type="submit"
				id="continue"
				onClick={() => props.setIsFinished(false)}
			>
				Continue
			</button>
		</div>
	);
};

const App = () => {
	return (
		<div>
			<Body />
		</div>
	);
};

export default App;
