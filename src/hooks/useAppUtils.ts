import { useNotification } from '../contexts/NotificationContext';
import { useLoading } from '../contexts/LoadingContext';
import { logger } from '../lib/logger';
import { trackEvent, identifyUser } from '../lib/analytics';
import { captureException } from '../lib/sentry';

export function useAppUtils() {
  const { showNotification } = useNotification();
  const { withLoading } = useLoading();

  const handleError = (error: Error, context?: Record<string, any>) => {
    // Log the error
    logger.error(error.message, { error, ...context });

    // Send to Sentry
    captureException(error, context);

    // Show notification
    showNotification('error', error.message || 'An error occurred');
  };

  const handleSuccess = (message: string, eventName?: string, properties?: Record<string, any>) => {
    // Log the success
    logger.info(message, properties);

    // Track the event if provided
    if (eventName) {
      trackEvent(eventName, properties);
    }

    // Show notification
    showNotification('success', message);
  };

  const handleAsync = async <T,>(
    promise: Promise<T>,
    {
      successMessage,
      errorMessage = 'An error occurred',
      eventName,
      properties,
    }: {
      successMessage?: string;
      errorMessage?: string;
      eventName?: string;
      properties?: Record<string, any>;
    } = {}
  ): Promise<T | null> => {
    try {
      const result = await withLoading(promise);
      if (successMessage) {
        handleSuccess(successMessage, eventName, properties);
      }
      return result;
    } catch (error) {
      handleError(error instanceof Error ? error : new Error(errorMessage), properties);
      return null;
    }
  };

  return {
    handleError,
    handleSuccess,
    handleAsync,
    showNotification,
    withLoading,
    logger,
    trackEvent,
    identifyUser,
  };
} 