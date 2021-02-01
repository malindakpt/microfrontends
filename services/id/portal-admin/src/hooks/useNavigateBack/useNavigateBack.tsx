import { useHistory } from 'react-router-dom';
import { useAppStateIDS } from 'AppStateIDS';

export function useNavigateBack(): { navigateBack: () => void } {
  const { breadcrumbs } = useAppStateIDS();
  const history = useHistory();

  const navigateBack = () => {
    if (breadcrumbs.length > 1) {
      const newPath = breadcrumbs[breadcrumbs.length - 2].url;
      setImmediate(() => {
        // setImmediate needed when the form has errors
        history.push(newPath);
      });
    }
  };

  return { navigateBack };
}
