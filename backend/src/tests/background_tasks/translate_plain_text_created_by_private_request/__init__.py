

def add_fresh_jobs(background_task_scheduler, BACKGROUND_TASKS):
    
    from tests.background_tasks.translate_plain_text_created_by_private_request.main import test_read_task_result
    from tests.background_tasks.translate_plain_text_created_by_private_request.main import test_mark_invalid_tasks
    from tests.background_tasks.translate_plain_text_created_by_private_request.main import execute_in_batch
    from tests.background_tasks.translate_plain_text_created_by_private_request.main import main
"""     background_task_1_conf = BACKGROUND_TASKS['test_delete_invalid_file']
    
    if background_task_scheduler.get_job(background_task_1_conf.ID) != None:
        background_task_scheduler.remove_job(background_task_1_conf.ID)
 
    background_task_scheduler.add_job(
        test_get_task_id_from_task_result_file_path,
        id=background_task_1_conf.ID,
        trigger=background_task_1_conf.TRIGGER,
        **background_task_1_conf.CONFIG
    )
    
    return background_task_scheduler
     """