from infrastructure.configs.main import GlobalConfig
from infrastructure.adapters.background_task_manager.main import BackgroundTaskManager
from apscheduler.schedulers.asyncio import AsyncIOScheduler


def init_test_background_tasks(config: GlobalConfig):

    from tests.background_tasks.delete_invalid_file import add_fresh_jobs as add_fresh_jobs_1
    from tests.background_tasks.translate_plain_text_created_by_private_request import add_fresh_jobs as add_fresh_jobs_7
    from tests.background_tasks.detect_plain_text_language_created_by_private_request import add_fresh_jobs as add_fresh_jobs_2
    from tests.background_tasks.detect_plain_text_language_created_by_public_request import add_fresh_jobs as add_fresh_jobs_3
    from tests.background_tasks.send_translation_email import add_fresh_jobs as add_fresh_jobs_4
    from tests.background_tasks.translate_file_created_by_private_request.translate_content.docx import add_fresh_jobs as add_fresh_jobs_5
    from tests.background_tasks.translate_file_created_by_private_request.translate_content.pptx import add_fresh_jobs as add_fresh_jobs_6
    from tests.background_tasks.translate_plain_text_created_by_public_request import add_fresh_jobs as add_fresh_jobs_8

    BACKGROUND_TASKS = config.APP_CONFIG.TEST_BACKGROUND_TASKS

    new_background_task_scheduler = BackgroundTaskManager(AsyncIOScheduler())

    new_background_task_scheduler.remove_all_jobs()

    new_background_task_scheduler = add_fresh_jobs_1(
        new_background_task_scheduler, BACKGROUND_TASKS)
    new_background_task_scheduler = add_fresh_jobs_7(
        new_background_task_scheduler, BACKGROUND_TASKS)
    new_background_task_scheduler = add_fresh_jobs_1(
        new_background_task_scheduler, BACKGROUND_TASKS)
    new_background_task_scheduler = add_fresh_jobs_2(
        new_background_task_scheduler, BACKGROUND_TASKS)
    new_background_task_scheduler = add_fresh_jobs_3(
        new_background_task_scheduler, BACKGROUND_TASKS)
    new_background_task_scheduler = add_fresh_jobs_4(
        new_background_task_scheduler, BACKGROUND_TASKS)
    new_background_task_scheduler = add_fresh_jobs_5(
        new_background_task_scheduler, BACKGROUND_TASKS)
    new_background_task_scheduler = add_fresh_jobs_6(
        new_background_task_scheduler, BACKGROUND_TASKS)
    new_background_task_scheduler = add_fresh_jobs_8(
        new_background_task_scheduler, BACKGROUND_TASKS)
