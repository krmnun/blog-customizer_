import React, { useState } from 'react';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { Article } from './components/article/Article';
import { defaultArticleState } from './constants/articleProps';
import './styles/index.scss';

const App: React.FC<object> = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [articleStyles, setArticleStyles] = useState(defaultArticleState);

	const updateStyles = (newStyles: typeof defaultArticleState) => {
		setArticleStyles(newStyles);
		document.documentElement.style.setProperty(
			'--font-family',
			newStyles.fontFamilyOption.value
		);
		document.documentElement.style.setProperty(
			'--font-size',
			newStyles.fontSizeOption.value
		);
		document.documentElement.style.setProperty(
			'--font-color',
			newStyles.fontColor.value
		);
		document.documentElement.style.setProperty(
			'--container-width',
			newStyles.contentWidth.value
		);
		document.documentElement.style.setProperty(
			'--bg-color',
			newStyles.backgroundColor.value
		);
	};

	const handleReset = () => {
		updateStyles(defaultArticleState);
	};

	return (
		<main className='app'>
			<ArticleParamsForm
				initialState={articleStyles}
				isSidebarOpen={isSidebarOpen}
				onApply={updateStyles}
				onReset={handleReset}
				onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
			/>
			<Article />
		</main>
	);
};

export default App;