import bar from 'src/foo/bar';
import sammyImage from './sammy.jpg';
import './index.css';
import styles from './index.module.css';

document.querySelector('#root').innerHTML = `
  <div class="min-h-screen flex flex-col text-center">
    <header class="p-5 bg-indigo-600 text-white font-medium tracking-widest uppercase">Prototype</header>
    <div id="main" class="p-12 bg-gray-100 flex-1 flex justify-center items-center">
      <div class="p-5 bg-white shadow m-5 rounded-lg">
        <img src=${sammyImage} class="mx-auto block rounded-lg mb-8" />
        <h1 class="mb-4 text-4xl ${styles.myClass}">Welcome!</h1>
        <p class="font-serif text-xl text-gray-600 mb-4">This is a prototype skeleton.</p>
        <pre class="bg-gray-200 font-mono p-4 text-left text-sm text-orange-500">${JSON.stringify(
          bar
        )}</pre>
      </div>
    </div>
    <footer class="px-5 py-12 bg-gray-900 text-gray-500">Made in ${new Date().getFullYear()}</footer>
  </div>
`;
